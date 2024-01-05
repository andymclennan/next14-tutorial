"use client";

import Link from "next/link";
import styles from "./headerLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {

  const pathName = usePathname();

  /*
  // Split the pathname based on '/' and filter out empty strings (which occur if pathname starts with '/')
  const segments = pathName.split('/').filter(Boolean);

  // Check if the first segment is equal to item.path
  const isFirstSegmentMatch = segments.length > 0 && segments[0] === item.path;
  // Check if it's the Homepage
  const isHomepage = segments.length == 0 && item.title === "Homepage";

  <Link
    href={item.path}
    className={`${styles.container} ${styles.linkHover}
    ${isFirstSegmentMatch && styles.active}
    ${isHomepage && styles.active}
    `}
  >
    {item.title}
  </Link>

  console.log({ pathName, item });
  */

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${styles.linkHover}
        ${pathName === item.path && styles.active}
      `}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;