import React from "react";
import { CiLight } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <CiLight />
        </li>
        <li>
          <GiHamburgerMenu />
        </li>
        <li>
          <FaRegUser />
        </li>
      </ul>
    </nav>
  );
}
