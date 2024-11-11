import { BASE_URL,getAuthHeaders, defaultHeaders } from './index';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};
