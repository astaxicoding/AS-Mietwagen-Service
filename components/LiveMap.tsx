
import React, { useEffect, useRef, useState } from 'react';

interface LiveMapProps {
  pickupCoords?: { lat: number; lon: number } | null;
  destinationCoords?: { lat: number; lon: number } | null;
  onRouteCalculated?: (distanceKm: number, durationMin: number) => void;
}

const HOME_COORDS = { lat: 49.966, lon: 7.898 };

const LiveMap: React.FC<LiveMapProps> = ({ pickupCoords, destinationCoords, onRouteCalculated }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const approachPolylineRef = useRef<any>(null);
  const [isLReady, setIsLReady] = useState(false);

  // Check for Leaflet availability
  useEffect(() => {
    const checkL = () => {
      if ((window as any).L) {
        setIsLReady(true);
      } else {
        setTimeout(checkL, 100);
      }
    };
    checkL();
  }, []);

  // Initialisierung der Karte
  useEffect(() => {
    if (!isLReady || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    try {
      // Karte erstellen
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        center: [HOME_COORDS.lat, HOME_COORDS.lon],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        fadeAnimation: false,
        zoomAnimation: false,
        markerZoomAnimation: false
      });

      // Standard OSM Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      // WICHTIG: invalidateSize aufrufen
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);

      // ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.error("Map initialization error:", err);
    }
  }, [isLReady]);

  // Marker und Routen-Aktualisierung
  useEffect(() => {
    const L = (window as any).L;
    if (!isLReady || !L || !mapInstanceRef.current) return;

    try {
      // Alte Marker entfernen
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (polylineRef.current) polylineRef.current.remove();
      if (approachPolylineRef.current) approachPolylineRef.current.remove();

      const points: any[] = [];

      // Home Marker (Base)
      const homeMarker = L.marker([HOME_COORDS.lat, HOME_COORDS.lon], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #333; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        })
      }).addTo(mapInstanceRef.current);
      markersRef.current.push(homeMarker);

      if (pickupCoords) {
        const marker = L.marker([pickupCoords.lat, pickupCoords.lon], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: black; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
          })
        }).addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
        points.push([pickupCoords.lat, pickupCoords.lon]);
      }

      if (destinationCoords) {
        const marker = L.marker([destinationCoords.lat, destinationCoords.lon], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ea8e24; width: 14px; height: 14px; border-radius: 3px; transform: rotate(45deg); border: 3px solid white; box-shadow: 0 4px 10px rgba(234,142,36,0.4);"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
          })
        }).addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
        points.push([destinationCoords.lat, destinationCoords.lon]);
      }

      if (points.length === 2) {
        const fetchRoute = async () => {
          try {
            // Route: Home -> Pickup -> Destination
            const url = `https://router.project-osrm.org/route/v1/driving/${HOME_COORDS.lon},${HOME_COORDS.lat};${pickupCoords!.lon},${pickupCoords!.lat};${destinationCoords!.lon},${destinationCoords!.lat}?overview=full&geometries=geojson`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 'Ok' && data.routes.length > 0 && mapInstanceRef.current) {
              const route = data.routes[0];
              const coordinates = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);
              
              if (polylineRef.current) polylineRef.current.remove();
              
              polylineRef.current = L.polyline(coordinates, {
                color: '#ea8e24',
                weight: 6,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round'
              }).addTo(mapInstanceRef.current);

              const dist = route.distance / 1000;
              const dur = Math.round(route.duration / 60);
              onRouteCalculated?.(dist, dur);

              mapInstanceRef.current.fitBounds(polylineRef.current.getBounds(), { 
                padding: [80, 80],
                animate: false
              });
            } else {
              drawStraightLine();
            }
          } catch (error) {
            console.error("OSRM Routing Error:", error);
            drawStraightLine();
          }
        };

        const drawStraightLine = () => {
          if (!mapInstanceRef.current) return;
          const allPoints = [[HOME_COORDS.lat, HOME_COORDS.lon], ...points];
          polylineRef.current = L.polyline(allPoints, {
            color: '#ea8e24',
            weight: 5,
            opacity: 0.9,
            dashArray: '12, 12',
            lineCap: 'round'
          }).addTo(mapInstanceRef.current);

          // Calculate total straight line distance
          let dist = 0;
          for (let i = 0; i < allPoints.length - 1; i++) {
            dist += mapInstanceRef.current.distance(allPoints[i], allPoints[i+1]) / 1000;
          }
          
          const dur = Math.round(dist * 1.8 + 6);
          onRouteCalculated?.(dist, dur);

          mapInstanceRef.current.fitBounds(L.latLngBounds(allPoints), { 
            padding: [80, 80],
            animate: false
          });
        };

        fetchRoute();
      } else if (points.length === 1 && mapInstanceRef.current) {
        mapInstanceRef.current.setView(points[0], 15, { animate: false });
      }
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    } catch (err) {
      console.error("Map update error:", err);
    }
  }, [pickupCoords, destinationCoords, isLReady]);

  return (
    <div className="w-full h-full relative bg-gray-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Overlay-Gradient für schöneren Übergang zum Formular */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default LiveMap;
