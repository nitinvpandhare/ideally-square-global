import axios from './axiosConfig';
import { API_ENDPOINTS } from '../../utils/constants';

export const subscribeApi = {
  subscribe: async (email) => {
    return await axios.post(API_ENDPOINTS.subscribe, { email });
  },

  unsubscribe: async (email, token) => {
    return await axios.post(`${API_ENDPOINTS.subscribe}/unsubscribe`, { email, token });
  },

  submitContact: async (data) => {
    return await axios.post(API_ENDPOINTS.contact, data);
  },
};

export default subscribeApi;
