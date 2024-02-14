import React from "react";
import { PiCoffeeBold, PiCoffeeFill } from "react-icons/pi";
import { AiOutlinePhone, AiFillPhone } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiShoppingCart, HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../Components/imgsComponent/Brown_Illustrasi_Coffee_Cafe_Logo__1_-removebg-preview.png";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

import styles from "../Style/SideBar.module.css";
import { nanoid } from "nanoid";

const SideBar = () => {
  const location = useLocation();
  const { setLoggedInUser } = useContext(UserContext);

  return (
    <div className={styles.outer}>
      <ul className={styles.sidebar2}>
        <div className={styles.logo}>
          <img src={logo} alt="ChillCup" className={styles.imglogo} />
        </div>
        <br />
        <br />
        <br />
        <li>
          <NavLink to={"/"} key={nanoid()} className={styles.link}>
            {location.pathname === "/" ? (
              <GoHomeFill size={35} color={"#638F8F"} />
            ) : (
              <GoHome size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Menu"} key={nanoid()}>
            {location.pathname === "/Menu" ? (
              <PiCoffeeFill size={35} color={"#638F8F"} />
            ) : (
              <PiCoffeeBold size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to={"/Favorites"} key={nanoid()} className={styles.link}>
            {location.pathname === "/Favorites" ? (
              <AiFillHeart size={35} color={"#638F8F"} />
            ) : (
              <AiOutlineHeart size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Cart"} key={nanoid()} className={styles.link}>
            {location.pathname === "/Cart" ? (
              <HiShoppingCart size={35} color={"#638F8F"} />
            ) : (
              <HiOutlineShoppingCart size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/AboutUs"} key={nanoid()} className={styles.link}>
            {location.pathname === "/AboutUs" ? (
              <AiFillInfoCircle size={35} color={"#638F8F"} />
            ) : (
              <AiOutlineInfoCircle size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/Settings"} key={nanoid()} className={styles.link}>
            {location.pathname === "/Settings" ? (
              <IoSettingsSharp size={35} color={"#638F8F"} />
            ) : (
              <IoSettingsOutline size={30} color={"#638F8F"} />
            )}
          </NavLink>
        </li>
        <li>
          <BiLogOut size={30} color={"#638F8F"} onClick={() => setLoggedInUser('')}/>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
