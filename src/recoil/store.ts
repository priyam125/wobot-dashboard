import { Camera } from "@/components/shared/CameraTable/columns";
import { atom } from "recoil";
// import { Camera } from "@/components/shared/CameraTable/columns";

export const camerasState = atom({
  key: "camerasState", // unique ID (with respect to other atoms/selectors)
  default: [] as Camera[], // default value (aka initial value)
});
