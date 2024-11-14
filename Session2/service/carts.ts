import { BASE_URL, getAuthHeaders } from './index';

export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const addOrder = async (
  address: string,
  phone: string,
  cart_item: Array<{
    product_id: number;
    quantity: number;
    price: number;
    name: string;
  }>
) => {
  const body = {
    address,
    phone,
    cart_item
  };

  const response = await fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Failed to place order');
  return await response.json();
};
