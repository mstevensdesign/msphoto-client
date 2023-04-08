import NavCustom from "./Components/NavCustom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, NavLink as Link, useParams } from "react-router-dom";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Event from "./Pages/Event";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <NavCustom />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* <Route path="/events" element={<Events />}></Route> */}
        <Route path="/events">
          <Route index element={<Events />} />
          <Route path=":event_id" element={<Event />} />
        </Route>
        {/* <Route path="/images">
          <Route index element={<Images />} />
          <Route path=":event_id" element={<Images />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
