import "./App.css";
import { useState, useEffect } from "react";
import { getCameras } from "./axios/axios"; // Import the getCameras function
import { CameraTable } from "./components/shared/CameraTable/data-table";
import { columns, Camera } from "./components/shared/CameraTable/columns";
// import { RiCloudLine } from "react-icons/ri";
// import { TbDeviceHeartMonitor } from "react-icons/tb";


function App() {
  const [cameraData, setCameraData] = useState<Camera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCameraData = async () => {
    try {
      setLoading(true);
      const response = await getCameras();
      setCameraData(response.data.data); // Assuming the camera data is in response.data.data
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Failed to fetch camera data");
      console.error("Error fetching camera data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCameraData(); // Fetch data when the component mounts
  }, []);

  console.log(cameraData);

  return (
    <div className="min-h-screen">
      <img
        className="mx-auto max-w-full h-auto mb-6"
        src="../public/image.png"
        alt="image"
        height={200}
        width={200}
      />

      {loading && <p>Loading camera data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <CameraTable columns={columns} data={cameraData} />
      )}
    </div>
  );
}

export default App;
