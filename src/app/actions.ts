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
import { poiSchema, routePlanSchema, sustainableRouteSchema } from "@/lib/schemas";


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
