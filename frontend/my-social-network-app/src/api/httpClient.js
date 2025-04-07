import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_DB_URL;
const axiosConf = (signal) =>
  axios.create({
    baseURL,
    signal,
    headers: {
      'Content-type': 'application/json',
    },
    timeout: 2000,
  });

const genericRequest = async ({ requestType, url, data, signal }) => {
  try {
    const httpClient = axiosConf(signal);
    const response = await httpClient[requestType](url, data);

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response.data;
    } else {
      throw new Error('Unknown error.');
    }
  }
};

export const get = (url, signal) => {
  return genericRequest({ requestType: 'get', url, signal });
};
export const post = (url, data) => {
  return genericRequest({ requestType: 'post', url, data });
};
export const del = (url) => {
  return genericRequest({ requestType: 'delete', url });
};
export const patch = (url, data) => {
  return genericRequest({ requestType: 'patch', url, data });
};
