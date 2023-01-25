import "./App.scss";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Competition from "./Competition";
import Team from "./Team";
import Footer from "./Footer";
import Person from "./Person";
import ball from "./football.png";

function App() {
  return (
    <Router>
      <Link className="text-decoration-none" to="/">
        <div className="title-name">
          <h1 className="text-center d-flex justify-content-center title-h1">
            <div>Any</div>
            <div className="goals">
              <span className="title-g">G</span>
              <img src={ball} alt="Ball" className="rotating title-o"></img>
              <span className="title-als">als</span>
            </div>
          </h1>
          <h2 className="text-center title-y">Yesterday?</h2>
        </div>
      </Link>
      <Routes>
        <Route path="/competition/:id" element={<Competition />} />
        <Route path="/" element={<Home />} />
        <Route path="competition/team/:id" element={<Team />} />
        <Route path="person" element={<Person />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
