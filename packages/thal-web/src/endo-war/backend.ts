import Axios from 'axios-observable';

export const api = Axios.create({
  baseURL: 'https://www.leetchi.com/c/endo-war',
  timeout: 1000,
});
