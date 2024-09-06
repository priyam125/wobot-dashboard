// src/axiosInstance.ts
import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api-app-staging.wobot.ai/app/v1",
  headers: {
    Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
  },
});

export const getCameras = async () => Axios.get("/fetch/cameras");


// Utility function to update camera status
export const updateCameraStatus = async (id: number, status: "Active" | "Inactive") => {
    try {
      const response = await Axios.put("/update/camera/status", {
        id,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating camera status:", error);
      throw error;
    }
  };