import { Link } from "react-router-dom";
import "../../scss/layout.scss";
import UtilMenu from "./UtilMenu";

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
              <Link to="/category/all">
                <span>전체상품</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/category/female">
                <span>여성</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/category/male">
                <span>남성</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <UtilMenu />
    </div>
  );
}
