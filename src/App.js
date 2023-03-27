import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/HomePage/Home";
import Authorization from "./pages/Authorization/Authorizaation";
import Cart from "./pages/CartPage/Cart";
import Registration from "./pages/RegistrationPage/Registration";
import Header from "./components/header/Header";
import PersonalArea from "./pages/PersonalAreaPage/PersonalArea";

function App() {
  const token = useSelector((state) => state.users.token);

  return (
    <div className="App">
      <Header />
      {token ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/personalArea" element={<PersonalArea />} />
          <Route path="/registration" element={<Navigate to={"/"} />} />
          <Route path="/authorization" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personalArea" element={<Navigate to={'/authorization'} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
