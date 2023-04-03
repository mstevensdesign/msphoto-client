import NavCustom from "./Components/NavCustom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, NavLink as Link, useParams } from "react-router-dom";
import Home from "./Pages/Home";
import EventList from "./Pages/EventList";
import Event from "./Pages/Event";
import ImageList from "./Pages/ImageList";
import Image from "./Pages/Image";
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
          <Route index element={<EventList />} />
          <Route path=":event_id" element={<Event />} />
        </Route>
        <Route path="/images">
          <Route index element={<ImageList />} />
          <Route path=":filename" element={<Image />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
