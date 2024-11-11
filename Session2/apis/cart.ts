import { BASE_URL,getAuthHeaders, defaultHeaders } from './index';

export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};


export const postCart = async () => {
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  
    if (!response.ok) throw new Error('Add to cart failed');
    return await response.json();
  };
  