import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    const updateToken = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };
    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2 style={logoStyle}>🐾 Pet Lover's Hub</h2>

      <button
        style={hamburgerStyle}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div
        style={{
          ...linkContainer,
          ...(menuOpen ? { display: "flex" } : {}),
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About Us</Link>
        <Link to="/contact" style={linkStyle}>Contact Us</Link>

        {!token ? (
          <>
            <Link to="/register" style={buttonStyle}>Register</Link>
            <Link to="/login" style={buttonStyle}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/upload" style={linkStyle}>Upload Image</Link>
            <Link to="/petfood" style={linkStyle}>Pet Food</Link>
            <Link to="/gallery" style={linkStyle}>Gallery</Link>
            <Link to="/adopt" style={linkStyle}>Adopt</Link>
            <Link to="/cart" style={linkStyle}>Cart</Link>
            <button onClick={handleLogout} style={logoutStyle}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

// ✨ Responsive & styled components
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#a5c900",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "15px",
  flexWrap: "wrap",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
};

const hamburgerStyle = {
  fontSize: "24px",
  background: "transparent",
  border: "none",
  color: "#333",
  cursor: "pointer",
  display: "none",
};

const linkContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  alignItems: "center",
};

// 🎨 Link/button styles
const linkStyle = {
  textDecoration: "none",
  fontSize: "16px",
  color: "#333",
  fontWeight: "bold",
  padding: "8px 15px",
  borderRadius: "20px",
  transition: "0.3s",
};

const buttonStyle = {
  padding: "8px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#333",
  color: "white",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
};

const logoutStyle = {
  padding: "8px 15px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  transition: "0.3s ease-in-out",
};

// 🔧 Handle responsiveness using JS
if (window.innerWidth <= 768) {
  hamburgerStyle.display = "block";
  linkContainer.display = "none";
}

export default Navbar;
