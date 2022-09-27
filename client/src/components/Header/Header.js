import { Link } from "react-router-dom";
import "../../scss/layout.scss";
import { useSelector } from "react-redux";

export default function Header() {
  const isLogined = useSelector((state) => {
    return state.login.value;
  });

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
              <Link to="/all">
                <span>전체상품</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/female">
                <span>여성</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/male">
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
            <Link to="/register">
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
            <span class="material-icons-outlined">shopping_cart</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
