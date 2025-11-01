'use server';

/**
 * @fileOverview Generates personalized route plans based on user preferences and transportation modes.
 *
 * - personalizedRoutePlan - A function that generates a personalized route plan.
 * - RoutePlanInput - The input type for the personalizedRoutePlan function.
 * - RoutePlanOutput - The return type for the personalizedRoutePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoutePlanInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route.'),
  preferredModes: z
    .array(
      z.enum(['metro', 'bus', 'ev', 'auto', 'walking'])
    )
    .describe(
      "An array of preferred transportation modes, e.g., ['metro', 'walking']"
    ),
});

export type RoutePlanInput = z.infer<typeof RoutePlanInputSchema>;

const RoutePlanOutputSchema = z.object({
  plan: z
    .string()
    .describe('A step-by-step description of the personalized route plan.'),
});

export type RoutePlanOutput = z.infer<typeof RoutePlanOutputSchema>;

export async function personalizedRoutePlan(input: RoutePlanInput): Promise<RoutePlanOutput> {
  return personalizedRoutePlanFlow(input);
}

const personalizedRoutePlanFlow = ai.defineFlow(
  {
    name: 'personalizedRoutePlanFlow',
    inputSchema: RoutePlanInputSchema,
    outputSchema: RoutePlanOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
      name: 'personalizedRoutePlanPrompt',
      input: {schema: RoutePlanInputSchema},
      output: {schema: RoutePlanOutputSchema},
      prompt: `You are an intelligent route planning assistant for a smart city. Your goal is to create a personalized route plan based on the user's starting location, destination, and preferred modes of transport.
    
      Start Location: {{{startLocation}}}
      Destination: {{{endLocation}}}
      Preferred Modes: {{#each preferredModes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
      
      Generate a concise, step-by-step route plan in a list of bullet points that is easy to follow. Each step should be on a new line.
      
      Route Plan:`,
    });
    const {output} = await prompt(input);
    return output!;
  }
);
