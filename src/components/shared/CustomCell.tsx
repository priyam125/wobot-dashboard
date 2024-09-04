import React from "react";

type CustomCellProps = {
  value: string | number | null | undefined;
  fallback?: string;
  accessorKey?: string;
};

const CustomCell: React.FC<CustomCellProps> = ({
  value,
  fallback = "N/A",
  accessorKey,
}) => {
  // Check if accessorKey is "tasks" and the value is not empty
  if (
    accessorKey === "tasks" &&
    value !== null &&
    value !== undefined &&
    value !== ""
  ) {
    return <div>{`${value} Tasks`}</div>;
  } else if (
    accessorKey === "status" &&
    value !== null &&
    value !== undefined &&
    value !== ""
  ) {
    return (
      <div className={value === "Active" ? "bg-green-300" : "bg-gray-300"}>
        {value}
      </div>
    );
  }
  // Render the value or fallback if value is null, undefined, or empty
  return (
    <div>
      {value !== null && value !== undefined && value !== "" ? value : fallback}
    </div>
  );
};

export default CustomCell;
