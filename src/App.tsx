import "./App.css";
import { useState, useEffect } from "react";
import { getCameras } from "./axios/axios"; // Import the getCameras function
import { CameraTable } from "./components/shared/CameraTable/data-table";
import { Columns, Camera } from "./components/shared/CameraTable/columns";
import { camerasState } from "./recoil/store";
import { useRecoilState } from "recoil";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cameraData, setCameraData] = useRecoilState<Camera[]>(camerasState);

  const fetchCameraData = async () => {
    try {
      setLoading(true);
      const response = await getCameras();
      setCameraData(response.data.data);
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
        src="../image.png"
        alt="image"
        height={200}
        width={200}
      />
      {loading && <p>Loading camera data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <CameraTable columns={Columns} data={cameraData} />
      )}
    </div>
  );
}

export default App;
