import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../scss/layout.scss";
import UtilMenu from "./UtilMenu";
import { resetPage } from "../../store/slice/product";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <div className="headerLeft">
        <div className="logo">
          <Link to="/" onClick={() => dispatch(resetPage({ num: 1 }))}>
            <img src="/images/common/float_mn_home.png" alt="home" />
          </Link>
          <Link to="/" onClick={() => dispatch(resetPage({ num: 1 }))}>
            <img src="/images/common/logo.png" alt="ilbisonte" className="ilbisonte" />
          </Link>
        </div>
        <div className="gnb">
          <ul className="list">
            <li className="depth01">
              <Link to="/item/all" onClick={() => dispatch(resetPage({ num: 1 }))}>
                <span>전체상품</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/item/female" onClick={() => dispatch(resetPage({ num: 1 }))}>
                <span>여성</span>
              </Link>
            </li>
            <li className="depth01">
              <Link to="/item/male" onClick={() => dispatch(resetPage({ num: 1 }))}>
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
