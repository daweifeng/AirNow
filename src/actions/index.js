import axios from 'axios';
import API_KEY from '../config';

const getNewAirData = (location) => {
  // console.log('getting the location', location);
  const lat = location.latitude;
  const lng = location.longitude;
  const airData = axios.get(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=${API_KEY}`);
  // console.log(airData)
  return {
    type: 'NEW_AIR_DATA',
    payload: airData,
  };
};

export default getNewAirData;
