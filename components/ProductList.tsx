import Link from "next/link";
import Product from "./Product";
import styles from "../styles/page.module.scss";

type Props = {};

const API_URL =
  "https://api.zoomzoomapi.com/v1/products?per_page=20&with=country%2Cseller&only%5Bseller%5D=companyName%2Cnickname&category_id=64&page=1";

interface APIResponse {
  status: number;
  success: boolean;
  data: ProductType[];
}

const fetchProducts = async () => {
  const results = await fetch(API_URL);
  const result: APIResponse = await results.json();
  const products: ProductType[] = result.data;
  return products;
};

async function ProductList({}: Props) {
  const products = await fetchProducts();

  return (
    <div className={styles.productList}>
      {products?.map((product: ProductType) => (
        <div
          key={product.id}
          // href={`https://www.zoomzoomtour.com/tour/${product.id}`}
        >
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
