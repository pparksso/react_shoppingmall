import { Link } from "react-router-dom";
import IsLogined from "../User/IsLogined";
import LogoutBtn from "../User/LogoutBtn";

const UtilMenu = (props) => {
  return (
    <ul className="utilMenu">
      <li>
        {IsLogined() ? (
          <Link to="/mypage">
            <span>마이페이지</span>
          </Link>
        ) : (
          <Link to="/register">
            <span>회원가입</span>
          </Link>
        )}
      </li>
      <li>
        {IsLogined() ? (
          <LogoutBtn />
        ) : (
          <Link to="/login">
            <span>로그인</span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/cart">
          <span className="material-icons-outlined">shopping_cart</span>
        </Link>
      </li>
    </ul>
  );
};

export default UtilMenu;
