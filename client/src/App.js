import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";
import Product from "./components/product/Product";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/item/:category" element={<Product />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
