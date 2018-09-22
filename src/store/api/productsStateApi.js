import axios from 'axios';
import config from './config';

const API_PRODUCTS = config.PRODUCTS_API_URL;
const UPLOADS_API_URL = config.UPLOADS_API_URL;

export default {
  // Products apis
  getAllProducts () {
    return axios.get(`${API_PRODUCTS}`);
  },
  getProductById (id) {
    return axios.get(`${API_PRODUCTS}${id}`);
  },
  addUpdateProduct (formData, headers) {
    return axios({
      method: 'post',
      url: API_PRODUCTS,
      data: formData,
      config: headers,
    });
  },
  removeProduct (id) {
    return axios.delete(`${API_PRODUCTS}${id}`);
  },

  // upload productImages
  uploadImage (formData, headers) {
    return axios.post(`${UPLOADS_API_URL}`, formData, headers);
  },
};
