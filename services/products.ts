import { FiltersState } from "@/lib/redux/modules/filter";
import { API_URL } from "@/constants";

export const fetchProducts = async (
  filter?: FiltersState
): Promise<ProductType[]> => {
  const reqUrl = new URL(API_URL);
  const queryParams: Record<string, string> = {};

  if (filter) {
    if (filter.tourTypes) {
      const tourTypes = filter.tourTypes
        .map((option: OptionType) => option.key)
        .join(",");

      if (tourTypes) {
        queryParams["filter[tourType]"] = tourTypes;
      }
    }

    if (filter.itinerary && filter.itinerary.key) {
      queryParams["filter[itinerary]"] = filter.itinerary.key;
    }
  }

  Object.entries(queryParams).forEach(([key, value]) => {
    reqUrl.searchParams.append(key, value);
  });

  const results = await fetch(reqUrl.toString());
  if (!results.ok) {
    throw new Error("Failed to fetch data");
  }
  const result: APIResponse = await results.json();
  const products: ProductType[] = result.data;

  return products;
};
