

export type EnergyAppliance = {
  name: string;
  energyRating: 1 | 2 | 3 | 4 | 5;
  usage: number; // in kWh
  status: "On" | "Off" | "Standby";
  efficiencyStatus: "Optimal" | "Inefficient" | "Needs Check";
  color: string;
};

export const energyAppliances: EnergyAppliance[] = [
  { name: "Air Conditioner", energyRating: 3, usage: 5.2, status: "On", efficiencyStatus: "Inefficient", color: "hsl(var(--chart-1))" },
  { name: "Washing Machine", energyRating: 5, usage: 1.8, status: "Off", efficiencyStatus: "Optimal", color: "hsl(var(--chart-2))" },
  { name: "Refrigerator", energyRating: 4, usage: 2.5, status: "On", efficiencyStatus: "Optimal", color: "hsl(var(--chart-3))" },
  { name: "Smart TV", energyRating: 4, usage: 0.9, status: "Standby", efficiencyStatus: "Needs Check", color: "hsl(var(--chart-4))" },
  { name: "Lighting", energyRating: 5, usage: 1.1, status: "On", efficiencyStatus: "Optimal", color: "hsl(var(--chart-5))" },
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


export type EcoChallenge = {
    task: string;
    reward: string;
    completed: boolean;
};

export const ecoChallenges: EcoChallenge[] = [
    {
        task: "Use a fan instead of AC for 1 hour.",
        reward: "10 Eco-Points",
        completed: true,
    },
    {
        task: "Switch off all lights when leaving a room today.",
        reward: "15 Eco-Points",
        completed: false,
    },
    {
        task: "Unplug 'phantom load' devices before bed.",
        reward: "20 Eco-Points",
        completed: false,
    }
];

export type WeeklyImpact = {
    co2SavedKg: number;
    ecoScore: number;
};

export const weeklyImpact: WeeklyImpact = {
    co2SavedKg: 12.5,
    ecoScore: 450,
};

export type EnergyWidgetData = {
  currentUsage: number;
  predictedUsage: number;
  messages: {
    type: "alert" | "tip" | "motivation";
    text: string;
  }[];
};

export const energyWidgetData: EnergyWidgetData = {
  currentUsage: 8.7,
  predictedUsage: 19.2,
  messages: [
    {
      type: "alert",
      text: "High consumption in living room — check AC settings.",
    },
    {
      type: "tip",
      text: "Unplug idle devices to save energy.",
    },
    {
      type: "motivation",
      text: "You’re 15% more efficient today — great job saving power!",
    },
  ],
};

export type SeasonalTip = {
    season: "Summer" | "Monsoon" | "Winter";
    tip: string;
};

export const seasonalTips: SeasonalTip[] = [
    {
        season: "Summer",
        tip: "Pre-cool your home in the late afternoon to reduce peak-hour AC usage. Consider setting the thermostat to 25°C."
    },
    {
        season: "Monsoon",
        tip: "Use a dehumidifier during high-humidity days. It can make you feel cooler and reduce the need for AC."
    },
    {
        season: "Winter",
        tip: "Let sunlight in during the day to naturally warm your rooms. Use heavy curtains to retain heat at night."
    }
];

export type ApplianceSchedule = {
    appliance: string;
    time: string;
    enabled: boolean;
};

export const applianceSchedules: ApplianceSchedule[] = [
    {
        appliance: "Washing Machine",
        time: "Run at 2:00 AM (Off-peak)",
        enabled: true,
    },
    {
        appliance: "Water Heater",
        time: "Heat from 6:00 AM - 7:00 AM",
        enabled: false,
    }
];
