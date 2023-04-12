import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./components/Home";
import Login from "./components/login";
import Gym from "./components/gym";
import Guide from "./components/guide.js";
import Community from "./components/community.js";
import Info from "./components/info.js";
import Mypage from "./components/mypage.js"
import SimpleBottomNavigation from "./components/labelBottomNavigation.js";


import Gptlogo from "./asset/gptlogo.png";


function App() {
  function LabelBottomNavigation() {
    const [value, setValue] = React.useState('');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={Gptlogo} alt="" width="60" height="40" className="d-inline-block align-text-top" />                
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/gym">Gym</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/guide">Guide</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/community">Community</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/info">information</a>
                </li>
              </ul>
              <form className="d-flex">
                <Link className="nav-link" to="/mypage">mypage </Link>&nbsp;&nbsp;&nbsp;
                <Link className="nav-link" to="/Login">Sign up </Link>
              </form>
            </div>
          </div>
        </nav>
          <main>
          <div className="py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/gym" element={<Gym />}></Route>
                <Route path="/guide" element={<Guide />}></Route>
                <Route path="/community" element={<Community />}></Route>
                <Route path="/info" element={<Info />}></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/labelBottomNavigation" element={<LabelBottomNavigation />}></Route>
              </Routes>

            </div>
          </div>
        </main>          
      
      </BrowserRouter>


      <div className="container">
        <footer className="py-3 my-4">
        <SimpleBottomNavigation />
          
        </footer>
      </div>
      
    </div>
  );
}

export default App;
