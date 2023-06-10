"use client";
import Product from "./Product";
import styles from "../styles/page.module.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { FiltersState } from "@/lib/redux/modules/filter";
import FilterTag from "./FilterTag";
import FilterType from "@/types/FilterType";
import { API_URL } from "@/constants";

type Props = {};

interface APIResponse {
  status: number;
  success: boolean;
  data: ProductType[];
}

const fetchProducts = async (filter?: FiltersState) => {
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

function ProductList({}: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const filter = useAppSelector((state) => state.filter);

  useEffect(() => {
    fetchProducts()
      .then((products) => setProducts(products))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  useEffect(() => {
    fetchProducts(filter)
      .then((products) => setProducts(products))
      .catch((error) => console.error("Fetch error:", error));
  }, [filter]);

  return (
    <>
      <div className={styles.displayResult}>
        <b>{`검색결과: ${products?.length}개 상품`}</b>

        <div className={styles.displayFilters}>
          {filter.tourTypes?.map((tag) => {
            return (
              <FilterTag
                key={tag.key}
                tag={tag}
                filterType={FilterType.TourType}
              />
            );
          })}
          {filter.itinerary && (
            <FilterTag
              tag={filter.itinerary}
              filterType={FilterType.Itinerary}
            />
          )}
        </div>
      </div>
      <div className={styles.productList}>
        {products?.map((product: ProductType) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
