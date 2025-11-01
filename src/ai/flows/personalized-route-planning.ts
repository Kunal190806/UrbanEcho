'use server';

/**
 * @fileOverview Generates personalized route plans based on user preferences and transportation modes.
 *
 * - generateRoutePlan - A function that generates a personalized route plan.
 * - RoutePlanInput - The input type for the generateRoutePlan function.
 * - RoutePlanOutput - The return type for the generateRoutePlan function.
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
      'An array of preferred transportation modes, e.g., [\