'use server';

/**
 * @fileOverview Suggests travel routes that minimize carbon footprint.
 *
 * - suggestSustainableRoutes - A function that suggests routes that minimize carbon footprint.
 * - SustainableRouteSuggestionsInput - The input type for the suggestSustainableRoutes function.
 * - SustainableRouteSuggestionsOutput - The return type for the suggestSustainableRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainableRouteSuggestionsInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route.'),
  transportModes: z
    .array(z.string())
    .describe('A list of transport modes to consider (e.g., metro, bus, EV, auto, bicycle, walking).'),
});
export type SustainableRouteSuggestionsInput = z.infer<typeof SustainableRouteSuggestionsInputSchema>;

const SustainableRouteSuggestionsOutputSchema = z.object({
  routes: z.array(
    z.object({
      routeDescription: z.string().describe('A description of the route.'),
      carbonFootprint: z.number().describe('The estimated carbon footprint of the route (in kg CO2).'),
      transportModesUsed: z.array(z.string()).describe('The transport modes used in the route.'),
    })
  ).describe('A list of suggested routes, each with a description and carbon footprint.'),
});
export type SustainableRouteSuggestionsOutput = z.infer<typeof SustainableRouteSuggestionsOutputSchema>;

export async function suggestSustainableRoutes(
  input: SustainableRouteSuggestionsInput
): Promise<SustainableRouteSuggestionsOutput> {
  return sustainableRouteSuggestionsFlow(input);
}

const sustainableRouteSuggestionsFlow = ai.defineFlow(
  {
    name: 'sustainableRouteSuggestionsFlow',
    inputSchema: SustainableRouteSuggestionsInputSchema,
    outputSchema: SustainableRouteSuggestionsOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
      name: 'sustainableRouteSuggestionsPrompt',
      input: {schema: SustainableRouteSuggestionsInputSchema},
      output: {schema: SustainableRouteSuggestionsOutputSchema},
      prompt: `You are an expert in sustainable transportation and route planning. Given a starting location, a destination location, and a list of available transport modes, suggest several routes that minimize carbon footprint.
    
    Starting Location: {{{startLocation}}}
    Destination Location: {{{endLocation}}}
    Transport Modes: {{#each transportModes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    
    Consider the following factors when determining the carbon footprint of each route:
    
    *   The type of transport mode (e.g., walking, cycling, public transportation, electric vehicle, gasoline car).
    *   The distance traveled by each mode.
    *   The energy efficiency of each mode.
    *   The availability of public transportation and EV charging stations.
    
    Present the routes in a JSON format as described by the SustainableRouteSuggestionsOutputSchema schema. Focus on suggesting routes that use public transport, walking, cycling or EVs.
    `,
    });
    const {output} = await prompt(input);
    return output!;
  }
);
