import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const LogoutBtn = () => {
  const [cookie, , removeCookie] = useCookies(["auth"]);
  const token = cookie.auth;
  const logout = () => {
    axios({
      url: "http://localhost:8080/user/logout",
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
        console.log("500보내야됨");
      });
  };
  return (
    <button onClick={logout}>
      <span>로그아웃</span>
    </button>
  );
};

export default LogoutBtn;
