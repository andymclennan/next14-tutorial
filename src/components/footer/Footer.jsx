import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Andrew McLennan</div>
      <div className={styles.text}>
        Powered By Knowledge ©
      </div>
    </div>
  );
};

export default Footer;
