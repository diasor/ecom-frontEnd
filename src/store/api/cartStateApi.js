import axios from 'axios';
import config from './config';

const CART_API_URL = config.CART_API_URL;

export default {
  getCart (getFullCart) {
    return axios.get(`${CART_API_URL}${getFullCart}`);
  },
  addItemToCart (idCart, item) {
    return axios.post(`${CART_API_URL}${idCart}`, item);
  },
  updateItem (item) {
    const id = item._id;
    return axios.put(`${CART_API_URL}${id}`, item);
  },
  removeItemFromCart (itemToRemove) {
    return axios.post(`${CART_API_URL}`, itemToRemove);
  },
};
