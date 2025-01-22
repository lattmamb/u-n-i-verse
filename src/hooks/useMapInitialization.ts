import { useEffect, useRef, MutableRefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAP_STYLES, MAP_SETTINGS } from '@/utils/mapConfig';
import { initializeMapEffects } from '@/utils/mapEffects';
import { illinoisOutline } from '@/utils/illinoisGeoData';

interface MapInitializationProps {
  mapContainer: MutableRefObject<HTMLDivElement | null>;
  map: MutableRefObject<mapboxgl.Map | null>;
  userLocation: { lat: number; lng: number };
  is3DMode: boolean;
  onMapLoad?: () => void;
}

export const useMapInitialization = ({
  mapContainer,
  map,
  userLocation,
  is3DMode,
  onMapLoad
}: MapInitializationProps) => {
  const initializeMap = () => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAP_STYLES.default,
        center: [userLocation.lng, userLocation.lat],
        zoom: 5,
        ...MAP_SETTINGS,
        projection: is3DMode ? 'globe' : 'mercator'
      });

      setupMapLoadHandler();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const setupMapLoadHandler = () => {
    if (!map.current) return;

    map.current.on('style.load', () => {
      if (!map.current) return;

      initializeMapEffects(map.current);
      addIllinoisOutline();
      onMapLoad?.();
    });
  };

  const addIllinoisOutline = () => {
    if (!map.current) return;

    map.current.addSource('illinois-outline', {
      type: 'geojson',
      data: illinoisOutline
    });

    map.current.addLayer({
      id: 'illinois-outline',
      type: 'line',
      source: 'illinois-outline',
      layout: {},
      paint: {
        'line-color': '#627BC1',
        'line-width': 2,
        'line-opacity': 0.7
      }
    });
  };

  useEffect(() => {
    initializeMap();
    return () => {
      map.current?.remove();
    };
  }, [userLocation, is3DMode]);
};