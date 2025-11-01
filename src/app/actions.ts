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
import {
  getEnergySavingTips,
  type EnergySavingTipsInput,
} from "@/ai/flows/energy-saving-tips";
import {
  energyTipsSchema,
  memorySchema,
  poiSchema,
  routePlanSchema,
  sustainableRouteSchema,
} from "@/lib/schemas";
import { saveMemory, type SaveMemoryInput } from "@/ai/flows/save-memory-flow";

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
    return { message: "success", data: result, errors: {}, input: validatedFields.data };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while planning the route.",
      errors: {},
    };
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
    "Available POIs: Qutub Minar, Humayun's Tomb, India Gate, Hauz Khas Social, Perch Wine & Coffee Bar, Sarojini Nagar Market.";

  try {
    const result = await suggestNewPoi({
      ...validatedFields.data,
      cityData,
    } as SuggestNewPoiInput);
    return { message: "success", data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while fetching suggestions.",
      errors: {},
    };
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
    return {
      message: "An error occurred while suggesting routes.",
      errors: {},
    };
  }
}

export async function saveMemoryAction(prevState: any, formData: FormData) {
  const validatedFields = memorySchema.safeParse({
    command: formData.get("command"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const memoryData = await saveMemory(
      validatedFields.data as SaveMemoryInput
    );
    
    // With local auth, we just return the data to be handled by the client state.
    // In a real app, this is where you would save to your database.
    return {
      message: `Successfully saved memory: ${memoryData.placeName}`,
      data: memoryData,
      errors: {},
    };
  } catch (error: any) {
    return {
      message: error.message,
      errors: {},
    };
  }
}

export async function getAIEnergyTips(prevState: any, formData: FormData) {
  const validatedFields = energyTipsSchema.safeParse({
    usageData: formData.get("usageData"),
    appliances: formData.get("appliances"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await getEnergySavingTips(
      validatedFields.data as EnergySavingTipsInput
    );
    return { message: "success", data: result, errors: {} };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while generating AI tips.",
      errors: {},
    };
  }
}
