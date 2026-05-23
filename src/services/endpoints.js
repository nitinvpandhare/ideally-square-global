export const ENDPOINTS = {
  articles: {
    list: '/articles',
    detail: (id) => `/articles/${id}`,
    bySlug: (slug) => `/articles/slug/${slug}`,
    byCategory: (category) => `/articles/category/${category}`,
    featured: '/articles/featured',
    related: (id) => `/articles/${id}/related`,
    search: '/articles/search',
  },
  magazines: {
    list: '/magazines',
    detail: (id) => `/magazines/${id}`,
    bySlug: (slug) => `/magazines/slug/${slug}`,
    latest: '/magazines/latest',
  },
  interviews: {
    list: '/interviews',
    detail: (id) => `/interviews/${id}`,
    bySlug: (slug) => `/interviews/slug/${slug}`,
    featured: '/interviews/featured',
  },
  subscribe: {
    create: '/subscribe',
    unsubscribe: '/subscribe/unsubscribe',
    confirm: (token) => `/subscribe/confirm/${token}`,
  },
  contact: {
    submit: '/contact',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
};

export default ENDPOINTS;
