'use server';

/**
 * @fileOverview A flow for generating personalized energy-saving tips based on usage patterns.
 *
 * - getEnergySavingTips - A function that takes energy data and returns personalized tips.
 * - EnergySavingTipsInput - The input type for the getEnergySavingTips function.
 * - EnergySavingTipsOutput - The return type for the getEnergySavingTips function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EnergySavingTipsInputSchema = z.object({
  usageData: z.string().describe('A JSON string representing the user\'s recent energy usage data, including timestamps and consumption levels.'),
  appliances: z.string().describe('A JSON string listing the user\'s smart appliances and their energy ratings.'),
});

export type EnergySavingTipsInput = z.infer<typeof EnergySavingTipsInputSchema>;

const EnergySavingTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized, actionable energy-saving tips.'),
});

export type EnergySavingTipsOutput = z.infer<typeof EnergySavingTipsOutputSchema>;

export async function getEnergySavingTips(input: EnergySavingTipsInput): Promise<EnergySavingTipsOutput> {
  return energySavingTipsFlow(input);
}

const energySavingTipsFlow = ai.defineFlow(
  {
    name: 'energySavingTipsFlow',
    inputSchema: EnergySavingTipsInputSchema,
    outputSchema: EnergySavingTipsOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
      name: 'energySavingTipsPrompt',
      input: { schema: EnergySavingTipsInputSchema },
      output: { schema: EnergySavingTipsOutputSchema },
      prompt: `You are an AI assistant for a smart home energy app. Your goal is to provide personalized, actionable tips to help users reduce their energy consumption based on their usage data and appliance list.

      Analyze the following data:
      - Usage Data: {{{usageData}}}
      - Appliances: {{{appliances}}}

      Based on this data, generate a short list of 2-3 specific, encouraging, and easy-to-understand tips. Focus on behavioral changes and potential upgrades.

      Example Tips:
      - "Your power consumption is higher between 6–9 PM. Consider shifting your washing machine usage to daytime to save on peak costs."
      - "Your AC seems to be working hard. Setting it to 24°C can reduce its consumption by up to 15%."
      - "That old refrigerator is an energy guzzler! Upgrading to a 5-star model could save you over ₹3,000 a year."

      Generate the tips now.
      `,
    });
    const { output } = await prompt(input);
    return output!;
  }
);
