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