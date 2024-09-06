/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CameraContext } from "@/context/cameraContext";
import { Camera, CameraContextType } from "@/types/camera";
import CustomCell from "../CustomCell";
import { healthToColor, healthToPercentage } from "@/lib/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { RiCloudLine } from "react-icons/ri";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { updateCameraStatus } from "@/axios/axios";
import { DataTablePagination } from "../CameraTable/CameraTablePagination";

export default function CameraTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { cameras } = React.useContext(CameraContext) as CameraContextType;

  const [tableData, setTableData] = React.useState<Camera[]>(cameras);

  const toggleStatus = (_id: string, id: number, status: string) => {
    updateCameraStatus(id, status === "Active" ? "Inactive" : "Active");

    setTableData((prevData) =>
      prevData.map((camera) =>
        camera._id === _id
          ? {
              ...camera,
              status: camera.status === "Active" ? "Inactive" : "Active",
            }
          : camera
      )
    );
  };

  const columns: ColumnDef<Camera>[] = [
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
              <RiCloudLine
                className={`h-6 w-6 text-[${healthToColor(cloud)}]`}
              />

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
              <DropdownMenuItem
                onClick={() =>
                  toggleStatus(
                    row.original._id,
                    row.original.id,
                    row.original.status
                  )
                }
              >
                Toggle Status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log(row.original)}>
                Delete Camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col space-y-2">
          <div className="mr-auto font-semibold text-xl">Cameras</div>
          <div className="text-gray-500 text-sm font-medium">
            Manage your cameras here
          </div>
        </div>
        <Input
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="bg-white rounded-sm">
        <div className="flex items-center py-4">
          <select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              console.log(event.target.value);
              console.log(
                table.getColumn("status")?.getFilterValue() as string
              );

              table.getColumn("status")?.setFilterValue(event.target.value);
            }}
            className="bg-white p-2 outline-none border-gray-300 border rounded-md w-[250px] max-w-md md:ml-4"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-t-2 border-b-8 border-[#f9f9f9]"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
