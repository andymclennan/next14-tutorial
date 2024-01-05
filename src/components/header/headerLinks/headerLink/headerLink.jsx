"use client";

import Link from "next/link";
import styles from "./headerLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {

  const pathName = usePathname();

  //console.log({ pathName, item });

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${styles.linkHover} ${pathName === item.path && styles.active} ${
        item.title === "Logout" && styles.logout }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;

/*
pathName.length<=1 && item.title === "Homepage" && styles.active } ${
  pathName.length>1 && pathName.startsWith(item.path) && styles.active } ${
  item.title === "Logout" && styles.logout }
  */