import { FiltersState } from "@/lib/redux/modules/filter";
import { API_URL } from "@/constants";

/**
 * If provided with filtering parameters, returns filtered result data from the Products API.
 * @param {FiltersState | undefined} filter - Object used to filter the Products API
 * @return {Promise<ProductType[]>} Array of product items matching the provided parameters in the Products API result data
 * @throws {Error} Throws a new Error() exception if data is not retrieved from the API
 */
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

  // Convert all arguments of filters to URLSearchParams
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
