import axios from "axios";

const api = axios.create({
  baseURL: "https://note-app-g2wf.onrender.com",
});

export default api;
