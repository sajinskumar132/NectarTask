import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(store)/rootStore';
import { Mapcomp } from './Marker';
import { serviceClass } from '@/app/(sevices)/seviceClass';

function Map() {
  const [map, setMap] = useState<any>(null);
  const dispatch = useDispatch();
  const markerRef = useRef<any>(null);
  const [zoom] = useState(14);
  const LocationlatLon = useSelector((item: RootState) => item.map.SearchLocation);
  const Isedit = useSelector((item: RootState) => item.map.isEdit)
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_KEY!;

  useEffect(() => {
    if (!Isedit) {
      initializeMap();
    }
  }, [map, zoom, Isedit]);

  useEffect(() => {
    updateMapLocation();
  }, [LocationlatLon])

  const initializeMap = () => {
    if (map) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newMap = Mapcomp({ longitude, latitude, zoom });
        serviceClass.GetLocationByLatLng(latitude, longitude, dispatch);
        const newMarker = new maptilersdk.Marker({ color: '#FF0000' })
          .setLngLat([longitude, latitude])
          .addTo(newMap);
        markerRef.current = newMarker;
        setMap(newMap);
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  };

  const updateMapLocation = () => {
    if (LocationlatLon.longitude !== 0 && LocationlatLon.latitude !== 0) {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      const { longitude, latitude } = LocationlatLon;
      const newMap = Mapcomp({ longitude, latitude, zoom });
      const newMarker = new maptilersdk.Marker({ color: '#FF0000' })
        .setLngLat([LocationlatLon.longitude, LocationlatLon.latitude])
        .addTo(newMap);
      markerRef.current = newMarker;
      setMap(newMap);
    }
  };

  map?.on('click', function (e: any) {
    if (markerRef.current) {
      markerRef.current.remove();
    }
    serviceClass.GetLocationByLatLng(e.lngLat.lat, e.lngLat.lng, dispatch);
    const newMarker = new maptilersdk.Marker({ color: '#FF0000' })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);
    markerRef.current = newMarker;
  });


  return (
    <div className="map-wrap">
      <div id="map-container" className="map" />
    </div>
  );
}

export default Map;
