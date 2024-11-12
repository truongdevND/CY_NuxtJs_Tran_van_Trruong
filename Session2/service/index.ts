export const BASE_URL = 'http://152.42.240.131/api/v1'; 

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getAuthHeaders = (cookies:any) => {
  if (cookies) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${cookies}`,  
    };
  }

  return defaultHeaders;  
};