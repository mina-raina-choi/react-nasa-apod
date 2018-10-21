import axios from 'axios';

export function getAPOD(date = '') {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=XDKiytWdkqRAfd1ezBQLiUvyiAD0OpHLkgV73X9c&date=${date}`);
}