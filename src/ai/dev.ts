'use server';
/**
 * @fileOverview Development server entry point for Genkit flows.
 *
 * This file imports all the Genkit flows that are part of the application
 * so that they can be hot-reloaded and tested using the Genkit development server.
 */
import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-route-planning.ts';
import '@/ai/flows/suggest-new-poi.ts';
import '@/ai/flows/sustainable-route-suggestions.ts';
import '@/ai/flows/save-memory-flow.ts';
import '@/ai/flows/energy-saving-tips.ts';
import '@/ai/flows/optimize-energy-flow.ts';
