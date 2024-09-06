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
import { RiCloudLine } from "react-icons/ri";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import CustomCell from "../CustomCell";
import { Axios } from "@/axios/axios";
import { healthToColor, healthToPercentage } from "@/lib/utils";
import { Camera } from "@/types/camera";


const onUpdate = async (data: Camera) => {
  const newStatus = data.status === "Active" ? "Inactive" : "Active"; // Toggle the status

  try {
    await Axios.put("/update/camera/status", {
      id: data.id,
      status: newStatus,
    });

    location.reload();

    console.log(`Camera ${data._id} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};

const onDelete = (data: Camera) => {
  console.log(data);
};

export const Columns: ColumnDef<Camera>[] = [
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
            <RiCloudLine className={`h-6 w-6 text-[${healthToColor(cloud)}]`} />

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
            <TbDeviceHeartMonitor
              className={`h-6 w-6 text-[${healthToColor(device)}]`}
            />

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
