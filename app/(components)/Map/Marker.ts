import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
export const Mapcomp = ({ longitude, latitude, zoom }: { longitude: number, latitude: number, zoom: number }) => {
  return new maptilersdk.Map({
    container: 'map-container',
    style: maptilersdk.MapStyle.STREETS,
    center: [longitude, latitude],
    zoom: zoom,
  });
}