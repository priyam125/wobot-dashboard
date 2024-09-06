// import { useSetRecoilState } from "recoil";
// import { camerasState } from "@/recoil/store";
// import { updateCameraStatus as apiUpdateCameraStatus } from "@/axios/axios";
// import { Camera } from "@/components/shared/CameraTable/columns"; // Ensure you have the correct import

// export const useUpdateCameraStatus = () => {
//   const setCameras = useSetRecoilState(camerasState);

//   const updateCameraStatus = async (camera: Camera) => {
//     const newStatus = camera.status === "Active" ? "Inactive" : "Active";

//     try {
//       // Call the API to update the status
//       await apiUpdateCameraStatus(camera._id, newStatus);

//       // Update the Recoil state with the new status
//       setCameras((prevCameras) =>
//         prevCameras.map((c) =>
//           c._id === camera._id ? { ...c, status: newStatus } : c
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update status:", error);
//       // Handle error, e.g., show a notification
//     }
//   };

//   return updateCameraStatus;
// };
