// src/axiosInstance.ts
import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api-app-staging.wobot.ai/app/v1",
  headers: {
    Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
  },
});

export const getCameras = async () => Axios.get("/fetch/cameras");
