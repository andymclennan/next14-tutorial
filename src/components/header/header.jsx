import Link from "next/link"
import Links from "./headerLinks/headerLinks"
import styles from "./header.module.css"
import Image from "next/image";
import { auth } from "@/lib/auth";

const Header = async () => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <Image src="/pbk-logo.png" alt="Powered by Knowledge" width={50} height={50}/>
            <div className={styles.logoText}>PBK</div>
          </div>
        </Link>
      </div>
      <div>
        <Links session={session}/>
      </div>
    </div>
  )
}

export default Header