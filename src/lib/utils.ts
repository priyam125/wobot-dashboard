import { clsx, type ClassValue } from "clsx";
// import { Axios } from "node_modules/axios/index.d.cts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// Function to convert health status to percentage
export const healthToPercentage = (
  status: "A" | "B" | "C" | "D" | "E" | "F"
) => {
  const mapping: { [key: string]: number } = {
    A: 100,
    B: 80,
    C: 60,
    D: 40,
    E: 20,
    F: 0,
  };
  return mapping[status] || 0;
};

// Function to convert health status to color
export const healthToColor = (status: "A" | "B" | "C" | "D" | "E" | "F") => {
  const mapping: { [key: string]: string } = {
    A: "#4caf50", // Green
    B: "#8bc34a", // Light green
    C: "#ffeb3b", // Yellow
    D: "#ff9800", // Orange
    E: "#f44336", // Red
    F: "#d32f2f", // Dark red
  };
  return mapping[status] || "#000";
};


// export const deleteCamera = async (cameraId: string) => {
//   try {
//     await Axios.delete(`/cameras/${cameraId}`); // Replace with your API endpoint
//     console.log(`Camera ${cameraId} deleted successfully.`);
//   } catch (error) {
//     console.error("Failed to delete camera:", error);
//     // Handle errors appropriately (e.g., display an error message)
//   }
// };


