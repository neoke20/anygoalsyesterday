import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Competition from "./Competition";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Link className="text-decoration-none" to="/">
        <h1 className="text-center">Any<span id='title-g'>Goals</span></h1>
        <h2 className="text-center" id='title-y'>Yesterday?</h2>
      </Link>
      <Routes>
        <Route path="/competition/:id" element={<Competition />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
