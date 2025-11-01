
export type Helpline = {
  name: string;
  number: string;
};

export const helplines: Helpline[] = [
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "Fire", number: "101" },
  { name: "Women Helpline", number: "1091" },
];

export type SafetyAlert = {
  title: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  time: string;
};

export const safetyAlerts: SafetyAlert[] = [
  {
    title: "Heavy Traffic Alert",
    severity: "Medium",
    description: "Expect delays on Ring Road due to VIP movement.",
    time: "30 min ago",
  },
  {
    title: "Thunderstorm Warning",
    severity: "High",
    description: "IMD issued thunderstorm alert for Delhi-NCR region.",
    time: "2 hours ago",
  },
  {
    title: "Area Safety Update",
    severity: "Low",
    description: "Increased patrolling in Sector 12-15 during evening hours.",
    time: "1 day ago",
  },
];

export type NearbyService = {
  name: string;
  type: "Hospital" | "Police Station";
  address: string;
  distance: string;
  status: string;
  beds?: "Available" | "Limited";
};

export const nearbyServices: NearbyService[] = [
  {
    name: "Apollo Hospital",
    type: "Hospital",
    address: "Sector 15, Saket",
    distance: "1.2 km",
    status: "24/7 Emergency",
    beds: "Available",
  },
  {
    name: "Max Healthcare",
    type: "Hospital",
    address: "Press Enclave Road",
    distance: "2.5 km",
    status: "24/7 Emergency",
    beds: "Limited",
  },
  {
    name: "Saket Police Station",
    type: "Police Station",
    address: "MB Road, Saket",
    distance: "0.8 km",
    status: "24/7",
  },
];
