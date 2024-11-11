export const BASE_URL = process.env.BASE_URL || 'http://152.42.240.131/api/v1'; 

export const defaultHeaders = {
  'Content-Type': 'application/json',
};
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  if (token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`, 
    };
  }

  return defaultHeaders;
};