import { BASE_URL, getAuthHeaders, defaultHeaders } from './index';

export const getProducts = async (
  currentPage: any,
  name: string = '',
  category_id: number | null = null,
  min_price: number | null = null,
  max_price: number | null = null,
  category_slug: string = ''
) => {
  const queryParams: any = {
    page: currentPage,
    name: name || '',
    category_id: category_id || '',          
    min_price: min_price || '',
    max_price: max_price || '',
    category_slug: category_slug || ''
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const url = `${BASE_URL}/products?${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const getProductById = async () => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

