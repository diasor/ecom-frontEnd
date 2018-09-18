import axios from 'axios';
import config from './config';

const API_MANUFACTURERS = config.MANUFACTURER_API_URL;

export default {
  getManufacturerById (id) {
    return axios.get(`${API_MANUFACTURERS}${id}`);
  },
  addManufacturer (manufacturer) {
    return axios.post(`${API_MANUFACTURERS}`, manufacturer);
  },
  updateManufacturer (manufacturer) {
    const id = manufacturer._id;
    return axios.put(`${API_MANUFACTURERS}${id}`, manufacturer);
  },
  removeManufacturer (id) {
    return axios.delete(`${API_MANUFACTURERS}${id}`);
  },
  getAllManufacturers () {
    return axios.get(`${API_MANUFACTURERS}`);
  },
};
