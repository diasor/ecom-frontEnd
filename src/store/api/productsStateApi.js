import axios from 'axios';
import config from './config';

const API_PRODUCTS = config.PRODUCTS_API_URL;
const API_MANUFACTURERS = config.MANUFACTURER_API_URL;
const UPLOADS_API_URL = config.UPLOADS_API_URL;

export default {
  // Products apis
  getAllProducts () {
    return axios.get(`${API_PRODUCTS}`);
  },
  getProductById (id) {
    return axios.get(`${API_PRODUCTS}${id}`);
  },
  addProduct (formData, headers) {
    // return axios.post(``, formData, headers);
    return axios({
      method: 'post',
      url: API_PRODUCTS,
      data: formData,
      config: headers,
    });
  },
  updateProduct (product) {
    console.log('updateProduct en producsStateApi ', product);
    return axios.put(`${API_PRODUCTS}${product._id}`, product);
  },
  removeProduct (id) {
    return axios.delete(`${API_PRODUCTS}${id}`);
  },

  // Manufacturers apis
  getAllManufacturers () {
    return axios.get(`${API_MANUFACTURERS}`);
  },

  // upload productImages
  uploadImage (formData, headers) {
    return axios.post(`${UPLOADS_API_URL}`, formData, headers);
  },
};
