'use server';

/**
 * @fileOverview A flow for suggesting new points of interest (POI) based on user travel history and preferences.
 *
 * - suggestNewPoi - A function that takes user history and preferences and suggests new POIs.
 * - SuggestNewPoiInput - The input type for the suggestNewPoi function.
 * - SuggestNewPoiOutput - The return type for the suggestNewPoi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNewPoiInputSchema = z.object({
  travelHistory: z
    .string()
    .describe('A summary of the user\'s recent travel history in the city.'),
  preferences: z
    .string()
    .describe('A description of the user\'s preferences for places to visit.'),
  cityData: z
    .string()
    .describe('A description of available points of interest in the city.'),
});

export type SuggestNewPoiInput = z.infer<typeof SuggestNewPoiInputSchema>;

const SuggestNewPoiOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of suggested new points of interest for the user.'),
  imageHints: z.array(z.string()).describe('A list of two-word keywords representing the types of places suggested, to be used for finding relevant images. For example: ["historic tomb", "trendy cafe"]').optional(),
});

export type SuggestNewPoiOutput = z.infer<typeof SuggestNewPoiOutputSchema>;

export async function suggestNewPoi(input: SuggestNewPoiInput): Promise<SuggestNewPoiOutput> {
  return suggestNewPoiFlow(input);
}

const suggestNewPoiFlow = ai.defineFlow(
  {
    name: 'suggestNewPoiFlow',
    inputSchema: SuggestNewPoiInputSchema,
    outputSchema: SuggestNewPoiOutputSchema,
  },
  async input => {
    const suggestNewPoiPrompt = ai.definePrompt({
      name: 'suggestNewPoiPrompt',
      input: {schema: SuggestNewPoiInputSchema},
      output: {schema: SuggestNewPoiOutputSchema},
      prompt: `You are a city guide that recommends new points of interest to users based on their travel history and preferences.
    
      Consider the user's travel history, preferences, and available points of interest in the city to generate personalized suggestions. Based on your suggestions, provide a list of two-word "imageHints" that best represent the categories of places you recommended. For example, if you suggest a historic monument and a modern cafe, the hints could be ["historic monument", "modern cafe"].
    
      Travel History: {{{travelHistory}}}
      Preferences: {{{preferences}}}
      City Data: {{{cityData}}}
    
      Generate the suggestions and corresponding image hints.`,
    });
    const {output} = await suggestNewPoiPrompt(input);
    return output!;
  }
);
