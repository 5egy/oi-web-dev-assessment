import React from "react";
import style from "../../styles/nav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../Redux/userSlice";

const Nav = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <nav className={style.navBar}>
      <ul>
        <li>
          <p onClick={() => Navigate("/home")}>home</p>
        </li>
        <li>
          <p onClick={() => Navigate("/admin")}>profile</p>
        </li>

        <li>
          <p
            onClick={() => {
              dispatch(userActions.logOut())
              window.localStorage.clear()
              Navigate("/login");
            }}
          >
            logout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
