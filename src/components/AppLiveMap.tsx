import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LiveMapProps {
  pickupCoords?: { lat: number; lng: number } | null;
  destinationCoords?: { lat: number; lng: number } | null;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ pickupCoords, destinationCoords, onRouteCalculated }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current).setView([49.967, 7.896], 13); // Bingen coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers
    if (pickupCoords) {
      const marker = L.marker([pickupCoords.lat, pickupCoords.lng]).addTo(mapRef.current)
        .bindPopup('Abholung');
      markersRef.current.push(marker);
    }
    if (destinationCoords) {
      const marker = L.marker([destinationCoords.lat, destinationCoords.lng]).addTo(mapRef.current)
        .bindPopup('Ziel');
      markersRef.current.push(marker);
    }

    // Fit bounds
    if (pickupCoords && destinationCoords) {
      const bounds = L.latLngBounds([
        [pickupCoords.lat, pickupCoords.lng],
        [destinationCoords.lat, destinationCoords.lng]
      ]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      
      // Simulate route calculation
      if (onRouteCalculated) {
        const distance = 10; // Placeholder
        const duration = 15; // Placeholder
        onRouteCalculated(distance, duration);
      }
    } else if (pickupCoords) {
      mapRef.current.setView([pickupCoords.lat, pickupCoords.lng], 15);
    }
  }, [pickupCoords, destinationCoords, onRouteCalculated]);

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
};

export default LiveMap;
