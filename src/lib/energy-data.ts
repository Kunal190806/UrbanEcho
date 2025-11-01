
export type EnergyAppliance = {
  name: string;
  energyRating: 1 | 2 | 3 | 4 | 5;
  usage: number; // in kWh
  status: "On" | "Off" | "Standby";
};

export const energyAppliances: EnergyAppliance[] = [
  { name: "Air Conditioner", energyRating: 3, usage: 5.2, status: "On" },
  { name: "Washing Machine", energyRating: 5, usage: 1.8, status: "Off" },
  { name: "Refrigerator", energyRating: 4, usage: 2.5, status: "On" },
  { name: "Smart TV", energyRating: 4, usage: 0.9, status: "Standby" },
  { name: "Lighting", energyRating: 5, usage: 1.1, status: "On" },
];

export const dailyUsageData = [
    { day: "Mon", usage: 15 },
    { day: "Tue", usage: 18 },
    { day: "Wed", usage: 16 },
    { day: "Thu", usage: 20 },
    { day: "Fri", usage: 23 },
    { day: "Sat", usage: 25 },
    { day: "Sun", usage: 22 },
];


export type EnergyInsight = {
    title: string;
    description: string;
};

export const energyInsights: EnergyInsight[] = [
    {
        title: "High Consumption Alert",
        description: "Your AC used 23% more energy today than average. Consider setting the temperature to 24°C."
    },
    {
        title: "Upgrade Insight",
        description: "Switching to an inverter refrigerator can reduce your power cost by ₹300/month."
    },
    {
        title: "Behavioral Nudge",
        description: "Try turning off standby devices between 11 PM – 7 AM to save 6% on your energy bill."
    }
];
