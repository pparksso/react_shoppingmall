import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import All from "./components/Main/All";
import Female from "./components/Main/Female";
import Male from "./components/Main/Male";
import Register from "./components/User/Register";
import Login from "./components/User/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/all" element={<All />} />
          <Route path="/female" element={<Female />} />
          <Route path="/male" element={<Male />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
