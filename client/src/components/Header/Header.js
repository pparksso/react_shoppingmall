import { useState } from "react";
import { Link } from "react-router-dom";
import "../../scss/layout.scss";

export default function Header() {
  const [showSubDepth01, setShowSubDepth01] = useState(false);
  const [showSubDepth02, setShowSubDepth02] = useState(false);
  const show01 = () => {
    setShowSubDepth01(true);
    setShowSubDepth02(false);
  };
  const show02 = () => {
    setShowSubDepth02(true);
    setShowSubDepth01(false);
  };
  const hide01 = () => {
    setShowSubDepth01(false);
  };
  const hide02 = () => {
    setShowSubDepth02(false);
  };
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
            <li className="depth01" onMouseEnter={show01}>
              <Link to="/item/female">
                <span>여성</span>
              </Link>
              <div className={showSubDepth01 ? "depth02Cover on" : "depth02Cover"} onMouseLeave={hide01}></div>
              <ul className={showSubDepth01 ? "depth02 on" : "depth02"}>
                <li>
                  <Link to="/item/female01">
                    <span>크로스/숄더</span>
                  </Link>
                </li>
                <li>
                  <Link to="/item/female02">
                    <span>토트</span>
                  </Link>
                </li>
                <li>
                  <Link to="/item/female03">
                    <span>클러치</span>
                  </Link>
                </li>
                <li>
                  <Link to="/item/female04">
                    <span>백팩</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="depth01" onMouseEnter={show02}>
              <Link to="/item/male">
                <span>남성</span>
              </Link>
              <div className={showSubDepth02 ? "depth02Cover on" : "depth02Cover"} onMouseLeave={hide02}></div>
              <ul className={showSubDepth02 ? "depth02 on" : "depth02"}>
                <li>
                  <Link to="/item/male01">
                    <span>크로스/숄더</span>
                  </Link>
                </li>
                <li>
                  <Link to="/item/male02">
                    <span>브리프케이스/토트</span>
                  </Link>
                </li>
                <li>
                  <Link to="/item/male03">
                    <span>백팩</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <ul className="utilMenu">
        <li>
          <Link to="/join">
            <span>회원가입</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>로그인</span>
          </Link>
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
