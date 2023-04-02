import NavCustom from "./Components/NavCustom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, NavLink as Link, useParams } from "react-router-dom";
import Home from "./Pages/Home";
import EventList from "./Pages/EventList";
import Event from "./Pages/Event";
import Images from "./Pages/Images";

function App() {
  return (
    <div className="App">
      <NavCustom />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/events" element={<Events />}></Route> */}
        <Route path="/events">
          <Route index element={<EventList />} />
          <Route path=":event_id" element={<Event />} />
        </Route>
        <Route path="/images" element={<Images />}></Route>
      </Routes>
    </div>
  );
}

export default App;
