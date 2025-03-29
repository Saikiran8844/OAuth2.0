import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchDrafts = (token) => API.get("/drafts", { headers: { Authorization: token } });
export const uploadToDrive = (token, data) => API.post("/drive/upload", data, { headers: { Authorization: token } });
