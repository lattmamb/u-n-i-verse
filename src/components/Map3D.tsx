import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapControls } from './map/MapControls';
import { MapOverlay, MapWrapper } from './map/MapOverlay';
import { useMapInitialization } from '@/hooks/useMapInitialization';

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
}

export const DEFAULT_LOCATION = {
  lat: 40.6331,
  lng: -89.3985
};

const Map3D: React.FC<MapProps> = ({ userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapActive, setIsMapActive] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  useMapInitialization({
    mapContainer,
    map,
    userLocation: userLocation || DEFAULT_LOCATION,
    is3DMode
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