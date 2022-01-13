import './App.scss';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Competition from "./Competition";

function App() {
  return (
    <Router>
      <Link className="text-decoration-none" to="/">
        <h1 className="text-center">Any Goals?</h1>
      </Link>
      <Routes>
        <Route path="https://anygoalsyesterday.netlify.app//competition/:id" element={<Competition />} />
        <Route path="https://anygoalsyesterday.netlify.app//" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
