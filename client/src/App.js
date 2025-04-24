import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Upload from "./pages/UploadPet";
import Gallery from "./pages/Gallery";
import Adopt from "./pages/Adoption";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PetFood from "./pages/PetFood";
import Cart     from "./pages/Cart"; 
import "./App.css";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token")); // ✅ Force re-render on token change
    };

    window.addEventListener("storage", updateToken);
    
    return () => {
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/gallery" element={token ? <Gallery /> : <Navigate to="/login" />} />
        <Route path="/adopt" element={token ? <Adopt /> : <Navigate to="/login" />} />
        <Route path="/petfood" element={token ? <PetFood /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
