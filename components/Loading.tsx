import Spinner from "../public/spinner.gif";
import Image from "next/image";
import styles from "../styles/loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.loader}>
      <Image src={Spinner} alt="loading" width={80} height={80} />
    </div>
  );
};

export default Loading;
