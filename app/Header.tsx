"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import styles from "../styles/header.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/lib/redux/hooks";
type Props = {};

function Header({}: Props) {
  const wishlistTotal = useAppSelector((state) => state.wishlist.number);
  const wishlistText = useMemo(() => {
    if (wishlistTotal >= 10) {
      return "9+";
    } else if (wishlistTotal >= 1) {
      return wishlistTotal;
    }
  }, [wishlistTotal]);
  return (
    <nav className={styles.header}>
      <Link href="/">
        <Image
          src="/../public/images/zoomzoomtour-logo.png"
          alt="줌줌"
          width={73}
          height={48}
        />
      </Link>
      <button className={styles.current_wishlist}>
        <FontAwesomeIcon icon={faHeart as IconProp} size="xl" />
        {wishlistTotal > 0 && (
          <div className={styles.wishlist_total}>{wishlistText}</div>
        )}
      </button>
    </nav>
  );
}

export default Header;
