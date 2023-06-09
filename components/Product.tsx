"use client";

import Image from "next/image";
import styles from "../styles/product.module.scss";
import React, { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart as solidFaHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux/hooks";
import { decrement, increment } from "@/lib/redux/modules/wishlist";

const Product: React.FC<{ product: ProductType }> = ({ product }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const dispatch = useAppDispatch();

  const handleWishlist = () => {
    if (isWishlist) {
      dispatch(decrement());
    } else {
      dispatch(increment());
    }
    setIsWishlist(!isWishlist);
  };
  return (
    <div className={styles.product}>
      <button className={styles.wishlist_btn} onClick={handleWishlist}>
        {isWishlist ? (
          <FontAwesomeIcon icon={solidFaHeart as IconProp} color={"red"} />
        ) : (
          <FontAwesomeIcon icon={faHeart as IconProp} />
        )}
      </button>
      <Link
        href={`https://www.zoomzoomtour.com/tour/${product.id}`}
        target="blank"
      >
        <Image
          src={product.representativeImageUrl}
          alt={product.title}
          width={230}
          height={250}
        />
      </Link>
      <span className={styles.tour_type}>
        {`${product.categoryName} • ${product.tourTime}`}
      </span>
      <Link
        className={styles.product_title}
        href={`https://www.zoomzoomtour.com/tour/${product.id}`}
        target="blank"
      >
        <h4>{product.title}</h4>
      </Link>
      <div className={styles.display_rating}>
        <span>
          <FontAwesomeIcon icon={faStar as IconProp} />
        </span>
        <span>{product.ratings.toFixed(1)}</span>
        <span>{` (${product.reviewTotal}개 후기)`}</span>
      </div>
      <div className={styles.display_price}>
        <h4>{product.displayLocalPrice}</h4>
        <span>{`(${product.displayPrice})`}</span>
      </div>
    </div>
  );
};

export default Product;
