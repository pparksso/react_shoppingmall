import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../scss/user.scss";
import { useDaumPostcodePopup } from "react-daum-postcode";
const cookies = new Cookies();

const Mypage = () => {
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const token = cookies.get(["auth"]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [address02, setAddress02] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [address01, setAddress01] = useState("");
  const emailFocus = useRef();

  useEffect(() => {
    axios({
      url: "https://ilbisonte.herokuapp.com/user/mypage",
      method: "POST",
      data: { token },
    })
      .then((res) => {
        setEmail(res.data.user.email);
        setName(res.data.user.name);
        setTel(res.data.user.tel);
        setZipcode(res.data.user.zipCode);
        setAddress01(res.data.user.address01);
        setAddress02(res.data.user.address02);
      })
      .catch((err) => navigate("/500"));
  }, []);

  const inputName = (e) => {
    setName(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
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
    navigate("/");
  };

  const editInfo = (e) => {
    e.preventDefault();
    if (password === "") return alert("비밀번호를 기입해주세요");
    if (name === "") return alert("이름을 입력해주세요.");
    if (tel === "") return alert("연락처를 입력해주세요.");
    if (zipCode === "") return alert("우편번호를 검색해주세요.");
    if (address01 === "") return alert("주소를 입력해주세요.");

    axios({
      url: "https://ilbisonte.herokuapp.com/user/editinfo",
      method: "POST",
      data: {
        token,
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
        if (res.data.message === "비밀번호가 틀렸습니다.") return alert(`${res.data.message}`);
        if (res.data.edit) {
          alert("회원 정보가 수정되었습니다.");
          navigate("/");
        }
      })
      .catch((err) => {
        navigate("/500");
      });
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
    <div className="mypage userPage">
      <div className="container">
        <div className="titleBox">
          <h1>회원 정보 수정</h1>
        </div>
        <div className="registerBox">
          <form action="" className="mypageForm">
            <div className="inputBox">
              <label>이메일</label>
              <div className="inner">
                <input type="email" name="email" placeholder="Email" required value={email} readOnly />
              </div>
            </div>
            <div className="inputBox">
              <label>비밀번호</label>
              <div className="inner">
                <input type="password" name="password" required placeholder="Password (8~16자리)" value={password} onChange={inputPassword} maxLength={16} minLength={8} />
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
              <button className="btn joinBtn" onClick={editInfo}>
                수정
              </button>
              <button className="btn resetBtn" onClick={reset}>
                취소
              </button>
              <button className="btn signOutBtn">탈퇴</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
