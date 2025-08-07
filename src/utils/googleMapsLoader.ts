import { Loader } from "@googlemaps/js-api-loader";

let loaderInstance: Loader | null = null;

export function getGoogleMapsLoader(): Loader {
  if (!loaderInstance) {
    loaderInstance = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["core", "marker", "places", "maps"],
    });
  }
  return loaderInstance;
}
