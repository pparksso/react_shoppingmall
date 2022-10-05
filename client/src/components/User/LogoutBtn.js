import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["auth"]);
  const token = cookie.auth;
  const logout = () => {
    axios({
      url: "https://ilbisonte.herokuapp.com/user/logout",
      method: "POST",
      data: {
        token,
      },
    })
      .then((res) => {
        if (res.data.logout) {
          removeCookie("auth");
          window.location.replace("/");
        }
      })
      .catch((err) => {
        navigate("/500");
      });
  };
  return (
    <button onClick={logout}>
      <span>로그아웃</span>
    </button>
  );
};

export default LogoutBtn;
