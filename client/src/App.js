import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer/Footer";
import All from "./components/main/All";
import Female from "./components/main/Female";
import Male from "./components/main/Male";

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
