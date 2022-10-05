import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Category from "./components/Main/Category";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Detail from "./components/Product/Detail";
import Mypage from "./components/User/Mypage";
import KakaoRedirect from "./components/User/KakaoRedirect";
import CartPage from "./components/Cart/CartPage";
import SuccessPay from "./components/Cart/SuccessPay";
import CanclePay from "./components/Cart/CanclePay";
import FailPay from "./components/Cart/FailPay";
import NotFound from "./components/Err/NotFound";
import ServerErr from "./components/Err/ServerErr";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:no" element={<Detail />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/kakaoredirect" element={<KakaoRedirect />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/successpay" element={<SuccessPay />} />
          <Route path="/canclepay" element={<CanclePay />} />
          <Route path="/failpay" element={<FailPay />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Routes>
          <Route path="/500" element={<ServerErr />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
