import "./App.css";
import React, { useState, useEffect } from "react";
import { getCameras } from "./axios/axios"; // Import the getCameras function
import { CameraTable } from "./components/shared/CameraTable/data-table";
import { Columns } from "./components/shared/CameraTable/columns";
import { CameraContextType } from "./types/camera";
import { CameraContext } from "./context/cameraContext";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cameras, setCameras } = React.useContext(
    CameraContext
  ) as CameraContextType;

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
      {!loading && !error && <CameraTable columns={Columns} data={cameras} />}
    </div>
  );
}

export default App;
