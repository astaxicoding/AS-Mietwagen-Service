
import { db, collection, addDoc, getDocs, query, where, Timestamp, handleFirestoreError, OperationType, deleteDoc, doc, updateDoc, getDoc } from '@/firebase';
import { BookingDetails } from '@/types';
import { sendCancellationEmailToCustomer, sendCancellationEmailToOwner } from '@/services/emailService';

const HOME_COORDS = { lat: 49.966, lon: 7.898 }; // Espenschiedstraße 1, 55411 Bingen am Rhein

export interface Vehicle {
  id: string;
  type: 'car' | 'bus';
  name: string;
}

const FLEET: Vehicle[] = [
  { id: 'bus-1', type: 'bus', name: 'Großraumbus 1' },
  { id: 'bus-2', type: 'bus', name: 'Großraumbus 2' },
  { id: 'car-1', type: 'car', name: 'Standard PKW 1' },
  { id: 'car-2', type: 'car', name: 'Standard PKW 2' },
];

/**
 * Berechnet die Route zwischen zwei oder mehr Punkten via OSRM
 */
export const calculateRoute = async (points: {lat: number, lon: number}[]) => {
  const coordsString = points.map(p => `${p.lon},${p.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=false`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.code === 'Ok') {
    return {
      distanceKm: data.routes[0].distance / 1000,
      durationMin: Math.round(data.routes[0].duration / 60)
    };
  }
  throw new Error('Route calculation failed');
};

/**
 * Berechnet die gesamte Fahrzeit inkl. Anfahrt und Rückfahrt (Home -> Pickup -> Destination -> Home)
 * Aber die Distanz für den Preis wird nur für Home -> Pickup -> Destination berechnet.
 * Wenn Zielort Bingen ist, wird die Anfahrt (Home -> Pickup) nicht berechnet.
 */
export const calculateFullTripMetrics = async (pickup: {lat: number, lon: number}, dest: {lat: number, lon: number}, isDestBingen: boolean = false) => {
  console.log('Calculating full trip metrics for:', pickup, dest, 'isDestBingen:', isDestBingen);
  
  // Wir berechnen zwei Routen:
  // 1. Die Strecke, die der Kunde bezahlt:
  //    - Normal: Home -> Pickup -> Destination
  //    - Wenn Ziel Bingen: Nur Pickup -> Destination (Anfahrt geschenkt)
  // 2. Destination -> Home (Die Rückfahrt, die für die Zeitplanung wichtig ist)
  
  try {
    const wayTherePoints = isDestBingen ? [pickup, dest] : [HOME_COORDS, pickup, dest];
    
    const [wayThere, wayBack] = await Promise.all([
      calculateRoute(wayTherePoints),
      calculateRoute([dest, HOME_COORDS])
    ]);

    const metrics = {
      distanceKm: wayThere.distanceKm,
      durationMin: wayThere.durationMin + wayBack.durationMin
    };
    
    console.log('Full trip metrics calculated:', metrics);
    return metrics;
  } catch (error) {
    console.error('Error in calculateFullTripMetrics:', error);
    // Fallback falls eine Route fehlschlägt
    const points = isDestBingen ? [pickup, dest, HOME_COORDS] : [HOME_COORDS, pickup, dest, HOME_COORDS];
    return await calculateRoute(points);
  }
};

/**
 * Berechnet den Preis der Fahrt
 * Bingen am Rhein Espenschiedstr 1 -> Abholadresse -> Zielort
 * 
 * PKW: (Distanz * 2,50€) + 3,70€ Grundgebühr
 * Bus: (Distanz * 2,50€) + 3,70€ Grundgebühr + 5,90€ Großraumzuschlag
 */
export const calculatePrice = (distanceKm: number, isLargeGroup: boolean) => {
  const baseFee = 3.70; // Grundgebühr ist immer 3,70€
  const perKm = 2.50;   // Kilometerpreis ist immer 2,50€
  
  // Grundpreis + (Distanz * Preis pro km)
  let price = baseFee + (distanceKm * perKm);
  
  // Großraumzuschlag für Busse
  if (isLargeGroup) {
    price += 5.90;
  }
  
  return Math.round(price * 100) / 100;
};

/**
 * Prüft die Verfügbarkeit der Fahrzeuge für einen Zeitraum
 */
export const checkAvailability = async (date: string, startTime: Date, endTime: Date, isLargeGroup: boolean, hasTrailer?: boolean) => {
  const path = 'availability';
  try {
    const availabilityRef = collection(db, path);
    const q = query(availabilityRef, where('date', '==', date));
    const snapshot = await getDocs(q);
    
    const existingSlots = snapshot.docs.map(doc => doc.data());
    
    // 1. Trailer-Verfügbarkeit prüfen, falls angefordert
    if (hasTrailer) {
      const trailerBusy = existingSlots.some(s => {
        if (!s.hasTrailer) return false;
        const bStart = new Date(s.startTime);
        const bEnd = new Date(s.endTime);
        return (startTime < bEnd && endTime > bStart);
      });
      
      if (trailerBusy) {
        // Wenn der einzige Anhänger belegt ist, können wir keine Fahrt mit Anhänger anbieten
        return [];
      }
    }

    // 2. Verfügbare Fahrzeuge filtern
    const availableVehicles = FLEET.filter(v => {
      // Wenn Großraumfahrt, nur Busse
      if (isLargeGroup) {
        if (v.type !== 'bus') return false;
      } else {
        // Wenn normale Fahrt, nur Standard PKW
        if (v.type !== 'car') return false;
      }
      
      // Prüfen ob Fahrzeug im Zeitraum belegt ist
      const isBusy = existingSlots.some(s => {
        if (s.vehicleId !== v.id) return false;
        
        const bStart = new Date(s.startTime);
        const bEnd = new Date(s.endTime);
        
        // Überlappung prüfen
        return (startTime < bEnd && endTime > bStart);
      });
      
      return !isBusy;
    });
    
    return availableVehicles;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return [];
  }
};

/**
 * Speichert eine Buchung in Firestore
 */
export const saveBooking = async (
  details: BookingDetails, 
  pickupCoords: {lat: number, lon: number}, 
  destCoords: {lat: number, lon: number},
  distanceKm: number,
  durationMin: number,
  vehicleId: string,
  startTime: Date,
  endTime: Date
) => {
  const bookingData = {
    ...details,
    pickupCoords,
    destCoords,
    distanceKm,
    durationMin,
    vehicleId,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    status: 'confirmed',
    createdAt: Timestamp.now()
  };
  
  try {
    // 1. Buchung speichern
    const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
    
    try {
      // 2. Verfügbarkeitsslot speichern (ohne PII)
      await addDoc(collection(db, 'availability'), {
        vehicleId,
        date: details.date,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        bookingId: bookingRef.id,
        hasTrailer: details.hasTrailer || false
      });
    } catch (availError) {
      console.error('Availability slot creation failed:', availError);
      handleFirestoreError(availError, OperationType.CREATE, 'availability');
      // We don't throw here because the booking itself succeeded
    }
    
    return bookingRef;
  } catch (error) {
    console.error('Booking creation failed:', error);
    handleFirestoreError(error, OperationType.CREATE, 'bookings');
    throw error;
  }
};
/**
 * Storniert eine Buchung
 */
export const cancelBooking = async (bookingId: string, reason: string) => {
  try {
    // 0. Buchungsdetails abrufen für E-Mail
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (!bookingSnap.exists()) {
      throw new Error('Booking not found');
    }
    
    const bookingData = bookingSnap.data() as any;

    // 1. Buchungsstatus auf 'cancelled' setzen
    await updateDoc(bookingRef, { 
      status: 'cancelled',
      cancellationReason: reason,
      cancelledAt: Timestamp.now()
    });
    
    // 2. Verfügbarkeitsslot entfernen
    const availabilityRef = collection(db, 'availability');
    const q = query(availabilityRef, where('bookingId', '==', bookingId));
    const snapshot = await getDocs(q);
    
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'availability', d.id)));
    await Promise.all(deletePromises);
    
    // 3. E-Mail an Kunden und Inhaber senden
    await Promise.all([
      sendCancellationEmailToCustomer(bookingData.email, bookingData.name, bookingData.date, bookingData.time, reason),
      sendCancellationEmailToOwner(bookingData, reason)
    ]);
    
    return true;
  } catch (error) {
    console.error('Cancellation failed:', error);
    handleFirestoreError(error, OperationType.DELETE, 'bookings');
    return false;
  }
};
