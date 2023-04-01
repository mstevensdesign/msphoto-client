import NavCustom from "./Components/NavCustom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, NavLink as Link } from "react-router-dom";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Images from "./Pages/Images";

function App() {
  return (
    <div className="App">
      <NavCustom />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/images" element={<Images />}></Route>
      </Routes>
    </div>
  );
}

export default App;
