import axios from "axios";
import { BASE_URL } from "./constants";

export const apiCall = (configs) => {
  axios.defaults.baseURL = BASE_URL;

  return axios(configs);
};
