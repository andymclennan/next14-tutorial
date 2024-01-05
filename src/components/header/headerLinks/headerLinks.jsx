"use client";

import { useState } from "react";
import styles from "./headerLinks.module.css";
import HeaderLink from "./headerLink/headerLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({session}) => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  // const session = true;
  // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        
        {session?.user ? (
          <HeaderLink item={{ title: "Dashboard", path: "/dashboard" }} />
         ) : (
          <HeaderLink item={{ title: "Homepage", path: "/" }} />
        )}
        {links.map((link) => (
          <HeaderLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <HeaderLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={`${styles.logout} ${styles.linkHover}`}>Logout</button>  {/* Needs to be a Button to handle Server Actions */}
            </form>
          </>
        ) : (
          <HeaderLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <HeaderLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
