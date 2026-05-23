import axiosInstance from './axiosConfig';

const uploadApi = {
  uploadMagazine: (formData, onProgress) =>
    axiosInstance.post('/admin/magazines/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 180000,
      onUploadProgress: (e) =>
        onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }),

  uploadArticle: (formData, onProgress) =>
    axiosInstance.post('/admin/articles/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
      onUploadProgress: (e) =>
        onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }),

  uploadImages: (formData, onProgress) =>
    axiosInstance.post('/admin/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
      onUploadProgress: (e) =>
        onProgress?.(Math.round((e.loaded * 100) / e.total)),
    }),
};

export default uploadApi;
