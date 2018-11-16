import axios from 'axios';
import API_KEY from '../config';

const getNewAirData = async (location) => {
  // console.log('getting the location', location);
  const lat = location.latitude;
  const lng = location.longitude;
  const airData = axios.get(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=${API_KEY}`);
  const airNowData = await axios.get(`https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=37.936&longitude=-122.0262&distance=25&API_KEY=CFE97C56-8C64-49C2-BA8C-10652F3442C2`)
  console.log(airNowData)
  // console.log(airData)
  return {
    type: 'NEW_AIR_DATA',
    payload: airData,
  };
};

export default getNewAirData;
