"use client";
import Product from "./Product";
import styles from "../styles/page.module.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { FiltersState } from "@/lib/redux/modules/filter";
import FilterTag from "./FilterTag";
import FilterType from "@/types/FilterType";
import { API_URL } from "@/constants";
import { fetchProducts } from "@/services/products";
import Loading from "./Loading";

type Props = {};

function ProductList({}: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const filter = useAppSelector((state) => state.filter);

  // fetch products based on the provided filter
  useEffect(() => {
    setLoading(true);
    fetchProducts(filter)
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [filter]);

  return (
    <>
      <div className={styles.displayResult}>
        <b>
          {loading
            ? "검색결과 불러오는 중..."
            : `검색결과: ${products?.length}개 상품`}
        </b>

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
        {loading ? (
          <div className={styles.overlay}>
            <Loading />
          </div>
        ) : (
          products?.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}

export default ProductList;
