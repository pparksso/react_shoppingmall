import { Link } from "react-router-dom";
import "../../scss/layout.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    axios({
      url: "http://localhost:8080/user/isLogined",
    })
      .then((res) => {
        if (!res.data.auth) {
          setIsLogined(false);
        } else if (res.data.auth) {
          setIsLogined(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="header">
      <div className="headerLeft">
        <div className="logo">
          <Link to="/">
            <img src="/images/common/float_mn_home.png" alt="home" />
          </Link>
          <Link to="/">
            <img src="/images/common/logo.png" alt="ilbisonte" className="ilbisonte" />
          </Link>
        </div>
        <div className="gnb">
          <ul className="list">
            <li className="depth01">
              <Link to="/item/all">
                <span>전체상품</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/item/female">
                <span>여성</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/item/male">
                <span>남성</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ul className="utilMenu">
        <li>
          {isLogined ? (
            <Link to="">
              <span>마이페이지</span>
            </Link>
          ) : (
            <Link to="/join">
              <span>회원가입</span>
            </Link>
          )}
        </li>
        <li>
          {isLogined ? (
            <Link to="/">
              <span>로그아웃</span>
            </Link>
          ) : (
            <Link to="/login">
              <span>로그인</span>
            </Link>
          )}
        </li>
        <li>
          <Link to="/search">
            <span class="material-icons">search</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
