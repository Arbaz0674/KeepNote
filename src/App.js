import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="This is alert"></Alert> */}
          <div className="container">
            <Routes>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
