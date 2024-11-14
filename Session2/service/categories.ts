import { BASE_URL,getAuthHeaders } from './index';


 const getCategory = async () => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch Categories');
  return await response.json();
};

export default getCategory;