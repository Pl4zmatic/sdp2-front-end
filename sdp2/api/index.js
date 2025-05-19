import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const post = async (url, { arg }) => {
  const { data } = await api.post(`/${url}`, arg);
  return data;
};

export const deleteById = async (url, { arg: id }) => {
  try {
    await api.delete(`/${url}/${id}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getById = async (url) => {
  const { data } = await api.get(`/${url}`);
  return data;
};

export async function save(url, { arg: { id, ...data } }) {
  await api({
    method: id ? 'PUT' : 'POST',
    url: `/${url}/${id ?? ''}`,
    data,
  });
}

export async function getAll(url) {
  const { data } = await api.get(`/${url}`);
  return Array.isArray(data) ? data : data.items;
}

export const getMe = async () => {
  const { data } = await api.get("/users/me");
  return data;
};