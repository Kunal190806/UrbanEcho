"use server";

import {
  personalizedRoutePlan,
  type RoutePlanInput,
} from "@/ai/flows/personalized-route-planning";
import {
  suggestNewPoi,
  type SuggestNewPoiInput,
} from "@/ai/flows/suggest-new-poi";
import {
  suggestSustainableRoutes,
  type SustainableRouteSuggestionsInput,
} from "@/ai/flows/sustainable-route-suggestions";
import { z } from "zod";

const routePlanSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
  preferredModes: z
    .array(z.enum(["metro", "bus", "ev", "auto", "walking"]))
    .min(1, "Select at least one transport mode"),
});

export async function getPersonalizedRoute(prevState: any, formData: FormData) {
  const validatedFields = routePlanSchema.safeParse({
    startLocation: formData.get("startLocation"),
    endLocation: formData.get("endLocation"),
    preferredModes: formData.getAll("preferredModes"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await personalizedRoutePlan(
      validatedFields.data as RoutePlanInput
    );
    return { message: "success", data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while planning the route.", errors: {} };
  }
}

const poiSchema = z.object({
  travelHistory: z.string().min(1, "Travel history is required"),
  preferences: z.string().min(1, "Preferences are required"),
});

export async function getPoiSuggestions(prevState: any, formData: FormData) {
  const validatedFields = poiSchema.safeParse({
    travelHistory: formData.get("travelHistory"),
    preferences: formData.get("preferences"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cityData =
    "Available POIs: Modern Art Museum, City Park, Historic Library, The Daily Grind Cafe, Riverside Walk, Tech Hub, Downtown Market.";

  try {
    const result = await suggestNewPoi({
      ...validatedFields.data,
      cityData,
    } as SuggestNewPoiInput);
    return { message: "success", data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while fetching suggestions.", errors: {} };
  }
}

const sustainableRouteSchema = z.object({
  startLocation: z.string().min(1, "Start location is required"),
  endLocation: z.string().min(1, "End location is required"),
});

export async function getSustainableRoutes(
  prevState: any,
  formData: FormData
) {
  const validatedFields = sustainableRouteSchema.safeParse({
    startLocation: formData.get("startLocation"),
    endLocation: formData.get("endLocation"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const transportModes = ["metro", "bus", "ev", "walking", "bicycle"];

  try {
    const result = await suggestSustainableRoutes({
      ...validatedFields.data,
      transportModes,
    } as SustainableRouteSuggestionsInput);
    return { message: "success", data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while suggesting routes.", errors: {} };
  }
}
