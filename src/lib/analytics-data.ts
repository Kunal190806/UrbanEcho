
export type CityMetric = {
    label: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
};

export const cityMetrics: CityMetric[] = [
    {
        label: 'Total Consumption',
        value: '1.21 GWh',
        change: '+5.4%',
        changeType: 'increase',
    },
    {
        label: 'Avg. Household',
        value: '280 kWh',
        change: '-2.1%',
        changeType: 'decrease',
    },
    {
        label: 'Peak Hour',
        value: '8 PM',
        change: 'vs 7 PM last week',
        changeType: 'increase',
    },
    {
        label: 'Carbon Intensity',
        value: '450 gCO2/kWh',
        change: '-3.2%',
        changeType: 'decrease',
    },
];

export const monthlyConsumption = [
    { date: "01/07", consumption: 35 },
    { date: "02/07", consumption: 38 },
    { date: "03/07", consumption: 40 },
    { date: "04/07", consumption: 42 },
    { date: "05/07", consumption: 45 },
    { date: "06/07", consumption: 48 },
    { date: "07/07", consumption: 46 },
    { date: "08/07", consumption: 44 },
    { date: "09/07", consumption: 47 },
    { date: "10/07", consumption: 50 },
    { date: "11/07", consumption: 52 },
    { date: "12/07", consumption: 55 },
    { date: "13/07", consumption: 53 },
    { date: "14/07", consumption: 51 },
];

export const neighborhoodLeaderboard = [
    { rank: 1, zone: 'Greenwood', efficiencyScore: 92, change: 3 },
    { rank: 2, zone: 'Maple Creek', efficiencyScore: 88, change: -1 },
    { rank: 3, zone: 'Oak Valley', efficiencyScore: 85, change: 1 },
    { rank: 4, zone: 'Cedar Heights', efficiencyScore: 81, change: -2 },
    { rank: 5, zone: 'Pine Ridge', efficiencyScore: 78, change: 0 },
];

export const peakUsageHeatmapData = [
  // M-F
  [0, 0, 10], [0, 1, 15], [0, 2, 20], [0, 3, 25], [0, 4, 30], [0, 5, 45], [0, 6, 60], [0, 7, 75], [0, 8, 80],
  [1, 6, 65], [1, 7, 80], [1, 8, 85], [1, 18, 90], [1, 19, 100], [1, 20, 95],
  [2, 7, 70], [2, 8, 78], [2, 18, 88], [2, 19, 95], [2, 20, 92],
  [3, 7, 72], [3, 8, 81], [3, 18, 91], [3, 19, 98], [3, 20, 94],
  [4, 7, 75], [4, 8, 85], [4, 18, 95], [4, 19, 99], [4, 20, 97],
  // Sat
  [5, 9, 60], [5, 10, 70], [5, 11, 80], [5, 12, 85], [5, 13, 88], [5, 19, 95], [5, 20, 90],
  // Sun
  [6, 10, 50], [6, 11, 65], [6, 12, 75], [6, 13, 80], [6, 19, 90], [6, 20, 85],
].map(([day, hour, value]) => ({ day, hour, value }));

export const consumptionByZone = [
    { zone: "North", consumption: 4500 },
    { zone: "South", consumption: 3200 },
    { zone: "East", consumption: 3900 },
    { zone: "West", consumption: 4100 },
    { zone: "Central", consumption: 5200 },
];
