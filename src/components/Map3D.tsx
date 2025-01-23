import React, { useRef, useState, useCallback, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapControls } from './map/MapControls';
import { MapOverlay, MapWrapper } from './map/MapOverlay';
import { useMapInitialization } from '@/hooks/useMapInitialization';
import { createMarkers } from './map/MapMarkers';

export interface User {
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

const Map3D: React.FC<MapProps> = React.memo(({ 
  userLocation, 
  activeUsers = [], 
  showDetailedView = false 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isMapActive, setIsMapActive] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  const cleanupMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  }, []);

  const addMarkers = useCallback(() => {
    if (!map.current) return;
    cleanupMarkers();
    markersRef.current = createMarkers({
      map: map.current,
      userLocation: userLocation || DEFAULT_LOCATION,
      activeUsers
    });
  }, [userLocation, activeUsers, cleanupMarkers]);

  useMapInitialization({
    mapContainer,
    map,
    userLocation: userLocation || DEFAULT_LOCATION,
    is3DMode,
    onMapLoad: addMarkers
  });

  const updateMapInteractivity = useCallback(() => {
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
  }, [isMapActive]);

  useEffect(() => {
    updateMapInteractivity();
  }, [updateMapInteractivity]);

  useEffect(() => {
    return () => {
      cleanupMarkers();
      if (map.current) {
        map.current.remove();
      }
    };
  }, [cleanupMarkers]);

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
});

Map3D.displayName = 'Map3D';

export default Map3D;