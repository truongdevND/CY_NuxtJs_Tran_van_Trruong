import { BASE_URL,getAuthHeaders, defaultHeaders } from './index';

export const getCart = async (cookie:any) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: getAuthHeaders(cookie),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};


export const postCart = async (cookie:any) => {
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: getAuthHeaders(cookie),
    });
  
    if (!response.ok) throw new Error('Add to cart failed');
    return await response.json();
  };
  