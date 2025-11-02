'use server';

/**
 * @fileOverview An AI-powered energy optimization engine that predicts consumption and recommends schedules.
 *
 * - optimizeEnergyUsage - A function that analyzes energy data to forecast consumption and suggest appliance schedules.
 * - OptimizeEnergyInput - The input type for the optimizeEnergyUsage function.
 * - OptimizeEnergyOutput - The return type for the optimizeEnergyUsage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OptimizeEnergyInputSchema = z.object({
  usageHistory: z.string().describe("A JSON string of the user's historical energy usage data over the last week."),
  weatherForecast: z.string().describe("A JSON string representing the weather forecast for the next 24 hours, including temperature and conditions."),
  appliances: z.string().describe("A JSON string listing the user's smart appliances, their power ratings, and current status."),
  timeOfDayTariffs: z.string().describe("A JSON string detailing time-of-day electricity tariffs (e.g., peak, off-peak hours and rates)."),
});

export type OptimizeEnergyInput = z.infer<typeof OptimizeEnergyInputSchema>;

const OptimizeEnergyOutputSchema = z.object({
  consumptionForecast: z.array(z.object({
    hour: z.string().describe("The hour of the day (e.g., '3 PM')."),
    predictedUsage: z.number().describe("The predicted energy consumption in kWh for that hour."),
  })).describe("An array of predicted energy consumption for the next 24 hours."),
  optimizedSchedules: z.array(z.object({
    appliance: z.string().describe("The name of the appliance."),
    recommendedTime: z.string().describe("The optimal time to run the appliance (e.g., '2:00 AM - 4:00 AM')."),
    reason: z.string().describe("The reason for the recommendation, such as 'Off-peak hours'."),
  })).describe("A list of recommended schedules for high-power appliances."),
  potentialSavings: z.string().describe("A summary of the potential savings if the user follows the recommendations, in percentage or kWh."),
});

export type OptimizeEnergyOutput = z.infer<typeof OptimizeEnergyOutputSchema>;

export async function optimizeEnergyUsage(input: OptimizeEnergyInput): Promise<OptimizeEnergyOutput> {
  return optimizeEnergyFlow(input);
}

const optimizeEnergyFlow = ai.defineFlow(
  {
    name: 'optimizeEnergyFlow',
    inputSchema: OptimizeEnergyInputSchema,
    outputSchema: OptimizeEnergyOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'optimizeEnergyPrompt',
      input: { schema: OptimizeEnergyInputSchema },
      output: { schema: OptimizeEnergyOutputSchema },
      prompt: `You are an AI Energy Optimization Engine for a smart home app. Your primary goal is to predict energy consumption and recommend optimal appliance schedules to minimize costs and wastage.

      Analyze the following data to generate a forecast and recommendations:
      - Historical Usage: {{{usageHistory}}}
      - Weather Forecast: {{{weatherForecast}}}
      - User's Appliances: {{{appliances}}}
      - Time-of-Day Tariffs: {{{timeOfDayTariffs}}}

      Your tasks are:
      1.  **Forecast Consumption**: Based on all the provided data, predict the total energy consumption for each hour over the next 24 hours. Consider how weather (e.g., higher temperature) might impact AC usage and how past patterns indicate user behavior.
      2.  **Optimize Schedules**: Identify high-power appliances (like washing machines, ACs) and suggest the best times to run them to take advantage of off-peak electricity rates. Provide a clear reason for each suggestion.
      3.  **Calculate Savings**: Summarize the potential savings (in percentage or kWh) that the user can achieve by following your optimized schedule.

      Generate a detailed and actionable response.
      `,
    });
    const { output } = await prompt(input);
    return output!;
  }
);
