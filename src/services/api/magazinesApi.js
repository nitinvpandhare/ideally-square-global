import axios from './axiosConfig';
import { ENDPOINTS } from '../endpoints';

export const magazinesApi = {
  getAll: async (params = {}) => {
    return await axios.get(ENDPOINTS.magazines.list, { params });
  },

  getById: async (id) => {
    return await axios.get(ENDPOINTS.magazines.detail(id));
  },

  getBySlug: async (slug) => {
    return await axios.get(ENDPOINTS.magazines.bySlug(slug));
  },

  getLatest: async () => {
    return await axios.get(ENDPOINTS.magazines.latest);
  },
};

export default magazinesApi;
