import React from "react";
import { CameraContextType, Camera } from "@/types/camera";

export const CameraContext = React.createContext<CameraContextType | null>(
  null
);

const CameraProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cameras, setCameras] = React.useState<Camera[]>([
    {
      name: "",
      location: "",
      recorder: "",
      tasks: "",
      status: "Inactive",
      _id: "",
      id: 0,
      current_status: "Online",
      health: {
        cloud: "A",
        device: "A",
        _id: "",
        id: "",
      },
      hasWarning: false,
    },
  ]);

  const saveCameras = (cameras: Camera[]) => {
    setCameras(cameras);
  };

  const updateCamera = (id: number) => {
    cameras?.filter((camera: Camera) => {
      if (camera.id === id) {
        camera.status = "Active";
        setCameras([...cameras]);
      }
    });
  };
  return (
    <CameraContext.Provider
      value={{ cameras, updateCamera, saveCameras, setCameras }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export default CameraProvider;
