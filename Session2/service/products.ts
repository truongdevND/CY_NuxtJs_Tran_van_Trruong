import { BASE_URL,getAuthHeaders, defaultHeaders } from './index';

export const getProducts = async (cookie:any,currentPage:any) => {
  const response = await fetch(`${BASE_URL}/products?page=${currentPage}`, {
    method: 'GET',
    headers: getAuthHeaders(cookie),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};