import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import User from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" Component={Signin} />
        <Route path="/user" Component={User} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
