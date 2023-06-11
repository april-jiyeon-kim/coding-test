"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import styles from "../styles/header.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "@/lib/redux/hooks";
import { useOutsideClick } from "@/lib/useOutsideClick";
type Props = {};

function Header({}: Props) {
  const [showWishlist, setShowWishlist] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(selectRef, () => {
    if (showWishlist) {
      setShowWishlist(false);
    }
  });

  const wishlistTotal = useAppSelector((state) => state.wishlist.number);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
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
      <button
        ref={selectRef}
        className={styles.current_wishlist}
        onClick={() => setShowWishlist((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faHeart as IconProp} size="xl" />
        {wishlistTotal > 0 && (
          <div className={styles.wishlist_total}>{wishlistText}</div>
        )}
        {showWishlist && (
          <div className={styles.wishlit_list}>
            <h4>위시 리스트</h4>
            <ul>
              {Object.keys(wishlistItems).map((id) => (
                <Link
                  key={id}
                  href={`https://www.zoomzoomtour.com/tour/${id}`}
                  target="blank"
                >
                  <li>{wishlistItems[id].title}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </button>
    </nav>
  );
}

export default Header;
