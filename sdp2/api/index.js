import axios from 'axios';

const baseUrl = 'http://localhost:4000/api';

export const post = async (url, { arg }) => {
  const { data } = await axios.post(`${baseUrl}/${url}`, arg);
  return data;
}; 