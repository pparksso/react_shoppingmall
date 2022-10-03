import React from "react";
import { KAKAO_KEY } from "./KakaoLoginKey";
import { REDIRECT_URL } from "./KakaoLoginKey";

const KakaoLoginBtn = () => {
  const kakaoAuth = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const kakaoLoginBtn = (e) => {
    e.preventDefault();
    window.location.href = kakaoAuth;
  };
  return (
    <div className="kakao">
      <button className="kakaoLoginBtn" onClick={kakaoLoginBtn}>
        <img src="/images/common/kakao_login_medium_wide.png" alt="카카오로그인" />
      </button>
    </div>
  );
};

export default KakaoLoginBtn;
