import axios from './axiosConfig';
import { ENDPOINTS } from '../endpoints';

export const interviewsApi = {
  getAll: async (params = {}) => {
    return await axios.get(ENDPOINTS.interviews.list, { params });
  },

  getById: async (id) => {
    return await axios.get(ENDPOINTS.interviews.detail(id));
  },

  getBySlug: async (slug) => {
    return await axios.get(ENDPOINTS.interviews.bySlug(slug));
  },

  getFeatured: async () => {
    return await axios.get(ENDPOINTS.interviews.featured);
  },
};

export default interviewsApi;
