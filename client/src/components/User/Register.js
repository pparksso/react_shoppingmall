import React, { useEffect, useRef, useState } from "react";
import "../../scss/user.scss";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailReturn, setEmailReturn] = useState(false);
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [tel, setTel] = useState("");
  const [address02, setAddress02] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [address01, setAddress01] = useState("");
  const emailFocus = useRef();

  useEffect(() => {
    emailFocus.current.focus();
  }, []);
  // 인풋 값 관리
  const inputName = (e) => {
    setName(e.target.value);
  };
  const inputEmail = (e) => {
    setEmailReturn(false);
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const inputPwCheck = (e) => {
    setPwCheck(e.target.value);
  };
  const inputTel = (e) => {
    const regex = /^[0-9\b ]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTel(e.target.value);
    }
  };
  const inputAddress02 = (e) => {
    setAddress02(e.target.value);
  };
  const reset = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setPwCheck("");
    setTel("");
    setZipcode("");
    setAddress01("");
    setAddress02("");
    emailFocus.current.focus();
  };
  // 메일 중복 체크 함수
  const emailCheck = (e) => {
    e.preventDefault();
    var regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regExp.test(email)) {
      axios({
        url: "http://localhost:8080/user/emailCheck",
        method: "POST",
        data: {
          email: email,
        },
      })
        .then((res) => {
          if (res.data.emailCheck) {
            setEmailReturn(true);
            alert("사용할 수 있는 이메일입니다.");
          } else {
            alert("이미 가입된 이메일입니다.");
          }
        })
        .catch((err) => {
          console.log("500보내야됨");
        });
    } else {
      alert("형식에 맞는 이메일 주소를 입력해주세요.");
    }
  };
  // 회원가입
  const fetchJoin = (e) => {
    e.preventDefault();
    if (email === "") return alert("이메일을 입력해주세요.");
    if (password === "" || pwCheck === "") return alert("비밀번호를 기입해주세요");
    if (name === "") return alert("이름을 입력해주세요.");
    if (tel === "") return alert("연락처를 입력해주세요.");
    if (zipCode === "") return alert("우편번호를 검색해주세요.");
    if (address01 === "") return alert("주소를 입력해주세요.");
    if (emailReturn) {
      if (password === pwCheck) {
        axios({
          url: "http://localhost:8080/user/join",
          method: "POST",
          data: {
            email,
            password,
            name,
            tel,
            zipCode,
            address01,
            address02,
          },
        })
          .then((res) => {
            if (res.data.join) {
              alert("회원가입되셨습니다. 로그인 해주세요.");
              navigate("/");
            }
          })
          .catch((err) => {
            console.log("500보내야됨");
          });
      } else return alert("비밀번호가 일치하지 않습니다");
    } else {
      alert("이메일 중복 확인 해주세요.");
    }
  };
  // daum-post
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setZipcode(data.zonecode);
    setAddress01(data.address);
  };

  const handleClick = (e) => {
    e.preventDefault();
    open({ onComplete: handleComplete });
  };
  return (
    <div className="register userPage">
      <div className="container">
        <div className="titleBox">
          <h1>회원가입</h1>
        </div>
        <div className="registerBox">
          <form action="" className="registerForm">
            <div className="inputBox">
              <label>이메일</label>
              <div className="inner">
                <input type="email" name="email" placeholder="Email" required value={email} onChange={inputEmail} ref={emailFocus} />
                <button className="btn" onClick={emailCheck}>
                  이메일 중복 확인
                </button>
              </div>
            </div>
            <div className="inputBox">
              <label>비밀번호</label>
              <div className="inner">
                <input type="password" name="password" required placeholder="Password (8~16자리)" value={password} onChange={inputPassword} maxLength={16} minLength={8} />
              </div>
            </div>
            <div className="inputBox">
              <label>비밀번호 확인</label>
              <div className="inner">
                <input type="password" name="passwordCheck" required placeholder="Password check (8~16자리)" value={pwCheck} onChange={inputPwCheck} maxLength={16} minLength={8} />
              </div>
            </div>
            <div className="inputBox">
              <label>이름</label>
              <div className="inner">
                <input type="text" name="name" placeholder="Name" required value={name} onChange={inputName} />
              </div>
            </div>
            <div className="inputBox">
              <label>연락처</label>
              <div className="inner">
                <input type="tel" name="tel" placeholder="-없이 입력" maxLength={13} required value={tel} onChange={inputTel} />
              </div>
            </div>
            <div className="inputBox">
              <label>주소</label>
              <div className="inner addressBox">
                <div className="zipCodeBox">
                  <input type="text" name="zipCode" required readOnly placeholder="Zip code" value={zipCode} />
                  <button className="btn" onClick={handleClick}>
                    우편번호 찾기
                  </button>
                </div>
                <input type="text" name="address01" required readOnly value={address01} />
                <input type="text" name="address02" value={address02} onChange={inputAddress02} />
              </div>
            </div>
            <div className="btns">
              <button className="btn joinBtn" onClick={fetchJoin}>
                회원가입
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

export default Register;
