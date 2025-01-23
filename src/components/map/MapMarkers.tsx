import mapboxgl from 'mapbox-gl';
import { User } from '../Map3D';

interface MapMarkersProps {
  map: mapboxgl.Map | null;
  userLocation: { lat: number; lng: number };
  activeUsers: User[];
}

export const createMarkers = ({ map, userLocation, activeUsers }: MapMarkersProps): mapboxgl.Marker[] => {
  if (!map) return [];
  
  const markers: mapboxgl.Marker[] = [];

  // Add user location marker
  const el = document.createElement('div');
  el.className = 'location-marker';
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L20 20L10 15L0 20L10 0Z' fill='%230EA5E9'/%3E%3C/svg%3E")`;
  el.style.backgroundSize = '100%';

  const marker = new mapboxgl.Marker(el)
    .setLngLat([userLocation.lng, userLocation.lat])
    .addTo(map);
  markers.push(marker);

  // Add other user markers
  activeUsers.forEach(user => {
    const userEl = document.createElement('div');
    userEl.className = 'user-marker';
    userEl.style.width = '12px';
    userEl.style.height = '12px';
    userEl.style.borderRadius = '50%';
    userEl.style.backgroundColor = user.active ? '#10B981' : '#EF4444';
    userEl.style.border = '2px solid white';
    userEl.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

    const userMarker = new mapboxgl.Marker(userEl)
      .setLngLat([user.lng, user.lat])
      .addTo(map);
    markers.push(userMarker);
  });

  return markers;
};