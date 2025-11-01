import { z } from "zod";

export const routePlanSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  preferredModes: z
    .array(z.enum(["metro", "bus", "ev", "auto", "walking"]))
    .min(1, "Select at least one transport mode"),
});

export const poiSchema = z.object({
  travelHistory: z.string().min(1, "Travel history is required"),
  preferences: z.string().min(1, "Preferences are required"),
});

export const sustainableRouteSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
});

export const memorySchema = z.object({
  command: z.string().min(1, "Command is required"),
  userId: z.string().min(1, "User ID is required"),
});

export const energyTipsSchema = z.object({
  usageData: z.string().min(1, "Usage data is required"),
  appliances: z.string().min(1, "Appliance data is required"),
});
