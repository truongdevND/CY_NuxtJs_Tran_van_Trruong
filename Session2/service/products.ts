import { BASE_URL, getAuthHeaders, defaultHeaders } from './index';

export const getProducts = async (cookie: any, currentPage: any) => {
  const response = await fetch(`${BASE_URL}/products?page=${currentPage}`, {
    method: 'GET',
    headers: getAuthHeaders(cookie),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};
export const filterProducts = async (
  cookie: any,
  currentPage: any,
  name: string = '',
  category_id: number | null = null,
  min_price: number | null = null,
  max_price: number | null = null,
  category_slug: string = ''
) => {
  const queryParams: any = {
    page: currentPage,
    name: name || undefined,
    category_id: category_id || undefined,          
    min_price: min_price || undefined,
    max_price: max_price || undefined,
    category_slug: category_slug || undefined
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const url = `${BASE_URL}/products?${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(cookie),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};
