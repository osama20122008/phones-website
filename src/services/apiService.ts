import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// المفضلة
export const favoritesAPI = {
  getFavorites: (userId: string) =>
    apiClient.get(`/api/favorites/${userId}`),
  
  addFavorite: (userId: string, phoneData: any) =>
    apiClient.post('/api/favorites', {
      userId,
      ...phoneData,
    }),
  
  removeFavorite: (userId: string, phoneId: string) =>
    apiClient.delete(`/api/favorites/${userId}/${phoneId}`),
};

// التقييمات
export const ratingsAPI = {
  getRatings: (phoneId: string) =>
    apiClient.get(`/api/ratings/${phoneId}`),
  
  addRating: (userId: string, phoneId: string, rating: number, comment: string) =>
    apiClient.post('/api/ratings', {
      userId,
      phoneId,
      rating,
      comment,
    }),
  
  getAverageRating: (phoneId: string) =>
    apiClient.get(`/api/ratings-average/${phoneId}`),
};

// الصحة
export const healthAPI = {
  check: () =>
    apiClient.get('/api/health'),
};

export default apiClient;
