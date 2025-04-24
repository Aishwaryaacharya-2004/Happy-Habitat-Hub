import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); 
      sessionStorage.setItem("isLoggedIn", "true"); // Use sessionStorage for live UI updates
      window.dispatchEvent(new Event("storage")); // Force navbar to update
      alert("Login successful!");
      navigate("/gallery");  
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🐾 Login to PetHub 🐶</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "380px",
    padding: "20px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.1)", 
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
    color: "white",
    margin: "100px auto",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#c5ff00",
  },
  input: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    border: "2px solid rgb(9, 176, 54)",
    borderRadius: "8px",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.8)",
    color: "black",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#c5ff00",
    color: "black",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Login;
