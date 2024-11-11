import { BASE_URL,getAuthHeaders, defaultHeaders } from './index';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
};


