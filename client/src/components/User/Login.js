import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slice/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailFocus = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 인풋 관리
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  // 취소 버튼 클릭 시 인풋 값 리셋
  const reset = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    emailFocus.current.focus();
  };
  // 렌더링 시 포커스
  useEffect(() => {
    emailFocus.current.focus();
  }, []);
  // 로그인
  const loginFunc = () => {
    if (email === "") return alert("이메일을 입력해주세요.");
    if (password === "") return alert("비밀번호를 입력해주세요.");
    axios({
      url: "http://localhost:8080/user/login",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.message === "등록된 이메일이 아닙니다.") return alert("등록된 이메일이 아닙니다.");
        if (res.data.message === "비밀번호가 틀렸습니다.") return alert("비밀번호가 틀렸습니다.");
        if (res.data.login) {
          dispatch(loginSuccess(true));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("500보내야됨");
      });
  };
  const loginClickEvent = (e) => {
    e.preventDefault();
    loginFunc();
  };
  const loginKeyEvent = (e) => {
    e.preventDefault();
    if (e.key === "Enter") return loginFunc();
  };
  return (
    <div className="login userPage">
      <div className="container">
        <div className="titleBox">
          <h1>로그인</h1>
        </div>
        <div className="loginBox">
          <form action="http://localhost:8080/user/login" method="POST" className="loginForm">
            <div className="inputBox">
              <label>이메일</label>
              <div className="inner">
                <input type="email" name="email" value={email} onChange={inputEmail} ref={emailFocus} />
              </div>
            </div>
            <div className="inputBox">
              <label>비밀번호</label>
              <div className="inner">
                <input type="password" name="password" value={password} onChange={inputPassword} onKeyDown={loginKeyEvent} maxLength={16} minLength={8} />
              </div>
            </div>
            <div className="kakao">
              <button className="kakaoLoginBtn">
                <img src="/images/common/kakao_login_medium_wide.png" alt="" />
              </button>
            </div>
            <div className="btns">
              <button className="btn loginBtn" onClick={loginClickEvent}>
                로그인
              </button>
              <button className="btn resetBtn" onClick={reset}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;