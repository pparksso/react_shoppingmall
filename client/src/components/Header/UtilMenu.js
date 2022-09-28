import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UtilMenu = (props) => {
  const [cookies, setCookies, removeCookies] = useCookies(["auth"]);
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();
  console.log(isLogined);
  const authCheck = () => {
    const token = cookies.auth;
    console.log(token);
    axios({
      method: "POST",
      url: "http://localhost:8080/user/isLogined",
      data: {
        token,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.auth) return setIsLogined(true);
        else return false;
      })
      .catch((err) => {
        console.log("500보내야됨");
      });
  };
  useEffect(() => {
    authCheck();
  });
  const logout = () => {
    axios({
      url: "http://localhost:8080/user/logout",
    })
      .then((res) => {
        if (res.data.logout) return navigate("/");
      })
      .catch((err) => {
        console.log("500보내야됨");
      });
  };
  return (
    <ul className="utilMenu">
      <li>
        {isLogined ? (
          <Link to="">
            <span>마이페이지</span>
          </Link>
        ) : (
          <Link to="/register">
            <span>회원가입</span>
          </Link>
        )}
      </li>
      <li>
        {isLogined ? (
          <button onClick={logout}>
            <span>로그아웃</span>
          </button>
        ) : (
          <Link to="/login">
            <span>로그인</span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/search">
          <span className="material-icons-outlined">shopping_cart</span>
        </Link>
      </li>
    </ul>
  );
};

export default UtilMenu;
