import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
type Props = {};

function Header({}: Props) {
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
        <div className={styles.wishlist_total}>1</div>
      </button>
    </nav>
  );
}

export default Header;
