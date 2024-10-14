import axios from "axios";

const api = axios.create({
  baseURL: "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io",
  withCredentials: true, // 쿠키 포함 설정
});

export default api;
