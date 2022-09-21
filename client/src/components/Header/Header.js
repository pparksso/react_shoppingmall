import { Link } from "react-router-dom";
import "../../scss/layout.scss";

export default function Header() {
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
