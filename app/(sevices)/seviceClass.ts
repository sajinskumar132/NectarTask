import axios from "axios";
import { updatelocation } from "../(store)/mainStore";


export class serviceClass{

    static getLocationSuggestions=(location:string)=>{
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`;
        return axios.get(apiUrl)
            .then(response => {
                const results = response.data.results;
                return results.map((result: any) => ({
                    formatted: result.formatted,
                    coordinates: result.geometry,
                }));
            })
            .catch(error => {
                console.error('Error fetching location suggestions:', error);
                return [];
            });
    }

    static GetLocationByLatLng =  (lat: number, lon: number,dispatch:any) => {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`;
        axios
          .get(apiUrl)
          .then((response) => {
            const results = response.data.results;
            if (results.length > 0) {
              const locationName = results[0].formatted;
              dispatch(updatelocation({ address: locationName, latitude: lat, longitude: lon }));
            } else {
              dispatch(updatelocation({ address: '', latitude: lat, longitude: lon }));
            }
          })
          .catch(() => {
            dispatch(updatelocation({ address: '', latitude: '', longitude: '' }));
          });
      };
    
}