/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import React, { useState, useEffect } from "react";
import { getCameras } from "./axios/axios";
import { CameraContextType } from "./types/camera";
import { CameraContext } from "./context/cameraContext";
import CameraTable from "./components/shared/CameraTable/CameraTable";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setCameras } = React.useContext(CameraContext) as CameraContextType;

  const fetchCameraData = async () => {
    try {
      setLoading(true);
      const response = await getCameras();
      setCameras(response.data.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch camera data");
      console.error("Error fetching camera data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameraData();
  }, []);

  return (
    <div className="min-h-screen">
      <img
        className="mx-auto max-w-full h-auto mb-6"
        src="../image.png"
        alt="image"
        height={200}
        width={200}
      />
      {loading && <p>Loading camera data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <CameraTable />}
    </div>
  );
}

export default App;
