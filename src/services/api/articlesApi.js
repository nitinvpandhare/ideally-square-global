import axios from './axiosConfig';
import { API_ENDPOINTS } from '../../utils/constants';

export const articlesApi = {
  getAll: async (params = {}) => {
    return await axios.get(API_ENDPOINTS.articles, { params });
  },

  getById: async (id) => {
    return await axios.get(`${API_ENDPOINTS.articles}/${id}`);
  },

  getBySlug: async (slug) => {
    return await axios.get(`${API_ENDPOINTS.articles}/slug/${slug}`);
  },

  getByCategory: async (category, params = {}) => {
    return await axios.get(`${API_ENDPOINTS.articles}/category/${category}`, { params });
  },

  getFeatured: async () => {
    return await axios.get(`${API_ENDPOINTS.articles}/featured`);
  },

  getRelated: async (id) => {
    return await axios.get(`${API_ENDPOINTS.articles}/${id}/related`);
  },
};

export default articlesApi;
