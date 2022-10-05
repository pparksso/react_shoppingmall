import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "POST",
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&code=${code}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => {
        const token = res.data.access_token;
        if (token) {
          axios({
            url: `https://kapi.kakao.com/v2/user/me?property_keys=["kakao_account.email"]`,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => {
              const email = res.data.kakao_account.email;
              axios({
                method: "POST",
                url: "https://ilbisonte.herokuapp.com/user/kakaologin",
                withCredentials: true,
                data: {
                  token,
                  email,
                },
              })
                .then((res) => {
                  if (res.data.login) {
                    window.location.replace("/");
                  }
                })
                .catch((err) => {
                  navigate("/500");
                });
            })
            .catch((err) => {
              navigate("/500");
            });
        }
      })
      .catch((err) => {
        navigate("/500");
      });
  }, []);

  return (
    <div className="kakao userPage">
      <div className="loadingBox">
        <div className="loading">
          <h1>로그인 중입니다.</h1>
        </div>
      </div>
    </div>
  );
};

export default KakaoRedirect;
