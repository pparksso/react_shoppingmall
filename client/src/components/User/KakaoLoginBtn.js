import React from "react";

const KakaoLoginBtn = () => {
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;
  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
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
