import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin, /*handleLinkedInLogin, handleGoogleLogin */ } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        {/* <form action={handleLinkedInLogin}>
          <button className={styles.linkedin}>Login with LinkedIn</button>
        </form>
        <form action={handleGoogleLogin}>
          <button className={styles.google}>Login with Google</button>
        </form> */}
        <line>-----</line>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
