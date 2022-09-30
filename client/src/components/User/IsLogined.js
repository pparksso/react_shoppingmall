import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const IsLogined = () => {
  const [login, setLogin] = useState(false);
  const token = cookies.get(["auth"]);
  if (token) {
    axios({
      url: "http://localhost:8080/user/isLogined",
      method: "POST",
      data: {
        token,
      },
    })
      .then((res) => {
        if (res.data.auth) return setLogin(true);
        else return setLogin(false);
      })
      .catch((err) => console.log("500"));
  }
  return !!login;
};
export default IsLogined;
