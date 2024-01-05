import Link from "next/link"
import Links from "./headerLinks/headerLinks"
import styles from "./header.module.css"
import { auth } from "@/lib/auth";

const Header = async () => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Logo</Link>
      <div>
        <Links session={session}/>
      </div>
    </div>
  )
}

export default Header