import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IsLogined from "../User/IsLogined";

const UtilMenu = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    axios({
      url: "http://localhost:8080/user/logout",
    })
      .then((res) => {
        if (res.data.logout) return navigate("/");
      })
      .catch((err) => {
        console.log("500보내야됨");
      });
  };
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
          <button onClick={logout}>
            <span>로그아웃</span>
          </button>
        ) : (
          <Link to="/login">
            <span>로그인</span>
          </Link>
        )}
      </li>
      <li>
        <Link to="/search">
          <span className="material-icons-outlined">shopping_cart</span>
        </Link>
      </li>
    </ul>
  );
};

export default UtilMenu;
