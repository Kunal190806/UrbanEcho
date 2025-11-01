'use server';

/**
 * @fileOverview A flow for saving a user's memory about a place.
 *
 * - saveMemory - A function that takes a user's command and extracts memory details.
 * - SaveMemoryInput - The input type for the saveMemory function.
 * - SaveMemoryOutput - The return type for the saveMemory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SaveMemoryInputSchema = z.object({
  command: z.string().describe('The user\'s natural language command to save a memory, e.g., "Save Café Aranya, Goa for dinner."'),
});

export type SaveMemoryInput = z.infer<typeof SaveMemoryInputSchema>;

const SaveMemoryOutputSchema = z.object({
  placeName: z.string().describe('The name of the place to be saved.'),
  notes: z.string().optional().describe('Any additional notes or details provided by the user.'),
});

export type SaveMemoryOutput = z.infer<typeof SaveMemoryOutputSchema>;

export async function saveMemory(input: SaveMemoryInput): Promise<SaveMemoryOutput> {
  const saveMemoryPrompt = ai.definePrompt({
    name: 'saveMemoryPrompt',
    input: { schema: SaveMemoryInputSchema },
    output: { schema: SaveMemoryOutputSchema },
    prompt: `You are an intelligent assistant that helps users save memories about places. Your task is to parse the user's command and extract the name of the place and any relevant notes.

    User command: "{{{command}}}"
    
    Extract the place name and any notes. For example, if the command is "Save Café Aranya, Goa for dinner", the place name is "Café Aranya, Goa" and the notes are "for dinner".
    If there are no specific notes, you can leave the notes field empty.
    `,
  });

  const { output } = await saveMemoryPrompt(input);
  if (!output) {
    throw new Error('Failed to parse memory from command.');
  }
  return output;
}
