import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.containerPage}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Powered</h1>
          <h1 className={styles.title}>By</h1>
          <h1 className={styles.title}>Knowledge</h1>
        </div>
        <div className={styles.imgContainer}>
          <Image
            src="/pbk-logo.png"
            width={500}
            height={500}
            alt="Powered by Knowledge Logo"
            className={styles.heroImg}
          />
        </div>
      </div>
      <div>
        <p className={styles.desc}>
          Join, share and learn.
        </p>
      </div>
    </div>
  );
};

export default Home;
