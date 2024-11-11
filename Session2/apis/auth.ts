import { BASE_URL, getAuthHeaders, defaultHeaders } from './index';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  return await response.json()
};

export const register = async ( email: string, password: string, name:string ) => {
  const response = await fetch(`${BASE_URL}/signup`, { 
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) throw new Error('Registration failed');
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Logout failed');
  return await response.json();
};
