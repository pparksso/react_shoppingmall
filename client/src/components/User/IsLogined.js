import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
const IsLogined = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const token = cookies.get(["auth"]);

  if (token) {
    axios({
      url: "https://ilbisonte.herokuapp.com/user/isLogined",
      method: "POST",
      data: {
        token,
      },
    })
      .then((res) => {
        if (res.data.auth) return setLogin(true);
        else return setLogin(false);
      })
      .catch((err) => navigate("/500"));
  }
  return !!login;
};
export default IsLogined;
