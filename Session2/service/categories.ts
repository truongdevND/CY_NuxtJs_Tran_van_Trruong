import { BASE_URL,getAuthHeaders } from './index';

 const getCategory = async (cookie:any) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: getAuthHeaders(cookie),
  });

  if (!response.ok) throw new Error('Failed to fetch Categories');
  return await response.json();
};

export default getCategory;