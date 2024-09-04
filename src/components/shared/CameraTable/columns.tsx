import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { CloudIcon } from "lucide-react";
import { RiCloudLine } from "react-icons/ri";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import CustomCell from "../CustomCell";
import { Axios } from "@/axios/axios";

export type Camera = {
  name: string;
  location: string;
  recorder: string;
  tasks: string;
  status: "Inactive" | "Active";
  _id: string;
  id: number;
  current_status: "Online" | "Offline";
  health: {
    cloud: "A" | "B" | "C" | "D" | "E" | "F";
    device: "A" | "B" | "C" | "D" | "E" | "F";
    _id: string;
    id: string;
  };
  hasWarning: boolean;
};

// Function to convert health status to percentage
const healthToPercentage = (status: "A" | "B" | "C" | "D" | "E" | "F") => {
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
const healthToColor = (status: "A" | "B" | "C" | "D" | "E" | "F") => {
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

const onUpdate = async (data: Camera) => {
  const newStatus = data.status === "Active" ? "Inactive" : "Active"; // Toggle the status

  try {
    // Make the API call to update the camera status
    await Axios.put("/update/camera/status", {
      id: data.id,
      status: newStatus,
    });

    // Successfully updated status; update the local data
    console.log(`Camera ${data._id} status updated to ${newStatus}`);
    
    // Optional: Refresh or update the UI state to reflect the change
    // This part depends on how your state management is set up
    // For example, if you're using React state or context, you would trigger a re-fetch or update the state here

  } catch (error) {
    console.error("Failed to update status:", error);
  }
};

const onDelete = (data: Camera) => {
  console.log(data);
};

export const columns: ColumnDef<Camera>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white p-0"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="bg-white p-0"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => <CustomCell value={row.getValue("name")} />,
  },
  {
    accessorKey: "health",
    header: "HEALTH",
    cell: ({ row }) => {
      const health = row.getValue("health") as Camera["health"];
      const { cloud, device } = health;

      return (
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center gap-1">
            {/* Icon for cloud status */}
            <RiCloudLine className={`h-6 w-6 text-[${healthToColor(cloud)}]`} />

            {/* Circular progress bar for cloud health */}
            <div style={{ width: 30, height: 30 }}>
              <CircularProgressbar
                value={healthToPercentage(cloud)}
                text={`${cloud}`}
                styles={buildStyles({
                  pathColor: healthToColor(cloud),
                  textColor: "black",
                  trailColor: "#e6e6e6",
                })}
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Icon for Device status */}
            <TbDeviceHeartMonitor
              className={`h-6 w-6 text-[${healthToColor(device)}]`}
            />

            {/* Circular progress bar for device health */}
            <div style={{ width: 30, height: 30 }}>
              <CircularProgressbar
                value={healthToPercentage(device)}
                text={`${device}`}
                styles={buildStyles({
                  pathColor: healthToColor(device),
                  textColor: "black",
                  trailColor: "#e6e6e6",
                  // textSize: "24px",
                })}
              />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "LOCATION",
    cell: ({ row }) => <CustomCell value={row.getValue("location")} />,
  },
  {
    accessorKey: "recorder",
    header: "RECORDER",
    cell: ({ row }) => <CustomCell value={row.getValue("recorder")} />,
  },
  {
    accessorKey: "tasks",
    header: "TASKS",
    cell: ({ row }) => (
      <CustomCell value={row.getValue("tasks")} accessorKey={"tasks"} />
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    filterFn: "includesStringSensitive",
    cell: ({ row }) => (
      <CustomCell value={row.getValue("status")} accessorKey={"status"} />
    ),
  },
  {
    id: "actions",
    accessorKey: "status",
    header: "Actions",
    cell: ({ row }) => {
      // const payment = row.original;
      // console.log(row.original);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-white">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onUpdate(row.original)}>
              Toggle Status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(row.original)}>
              Delete Camera
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
