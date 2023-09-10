import axios from "axios";

const config = {
    baseApiUri: process.env.NEXT_PUBLIC_API_URI,
  };
  
export const api = axios.create({
  baseURL: config.baseApiUri,
});