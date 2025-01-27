import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapControls } from './map/MapControls';
import { MapOverlay, MapWrapper } from './map/MapOverlay';
import { useMapInitialization } from '@/hooks/useMapInitialization';

interface User {
  id: number;
  lat: number;
  lng: number;
  active: boolean;
}

interface MapProps {
  userLocation?: { lat: number; lng: number } | null;
  activeUsers?: User[];
  showDetailedView?: boolean;
}

export const DEFAULT_LOCATION = {
  lat: 40.6331,
  lng: -89.3985
};

const Map3D: React.FC<MapProps> = ({ 
  userLocation, 
  activeUsers = [], 
  showDetailedView = false 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapActive, setIsMapActive] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  useMapInitialization({
    mapContainer,
    map,
    userLocation: userLocation || DEFAULT_LOCATION,
    is3DMode,
    onMapLoad: () => {
      if (!map.current) return;

      // Add user location marker with blue arrow
      const el = document.createElement('div');
      el.className = 'location-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L20 20L10 15L0 20L10 0Z' fill='%230EA5E9'/%3E%3C/svg%3E")`;
      el.style.backgroundSize = '100%';

      new mapboxgl.Marker(el)
        .setLngLat([userLocation?.lng || DEFAULT_LOCATION.lng, userLocation?.lat || DEFAULT_LOCATION.lat])
        .addTo(map.current);

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

        new mapboxgl.Marker(userEl)
          .setLngLat([user.lng, user.lat])
          .addTo(map.current);
      });

      if (showDetailedView) {
        map.current.flyTo({
          center: [userLocation?.lng || DEFAULT_LOCATION.lng, userLocation?.lat || DEFAULT_LOCATION.lat],
          zoom: 12,
          pitch: 60,
          bearing: 0,
          duration: 2000
        });
      }
    }
  });

  const updateMapInteractivity = () => {
    if (!map.current) return;

    if (isMapActive) {
      map.current.dragPan.enable();
      map.current.scrollZoom.enable();
      map.current.dragRotate.enable();
      map.current.touchZoomRotate.enable();
    } else {
      map.current.dragPan.disable();
      map.current.scrollZoom.disable();
      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disable();
    }
  };

  React.useEffect(() => {
    updateMapInteractivity();
  }, [isMapActive]);

  return (
    <>
      <MapWrapper isMapActive={isMapActive}>
        <div ref={mapContainer} className="w-full h-full" />
        <MapOverlay isMapActive={isMapActive} />
      </MapWrapper>

      <MapControls
        map={map.current}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        is3DMode={is3DMode}
        setIs3DMode={setIs3DMode}
      />
    </>
  );
};

export default Map3D;