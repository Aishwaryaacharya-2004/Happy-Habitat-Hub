import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ ...styles.container, backgroundImage: `url('/background.jpg')` }}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>🐶 Welcome to Pet Lover's Hub 🐱</h1>
        <p style={styles.subtitle}>
          A paradise for pet lovers! 🐾 Find your furry friend, shop for pet food, and explore adorable pet galleries.
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/register">
            <button
              style={styles.registerButton}
              onMouseEnter={(e) => hoverEffect(e, styles.registerButtonHover)}
              onMouseLeave={(e) => hoverEffect(e, styles.registerButton)}
            >
              Join Us 🐾
            </button>
          </Link>
          <Link to="/login">
            <button
              style={styles.loginButton}
              onMouseEnter={(e) => hoverEffect(e, styles.loginButtonHover)}
              onMouseLeave={(e) => hoverEffect(e, styles.loginButton)}
            >
              Login 🏡
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Media query-aware styles
const styles = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "40px",
    borderRadius: "20px",
    color: "white",
    maxWidth: "650px",
    width: "100%",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    marginBottom: "15px",
    textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
  },
  subtitle: {
    fontSize: "1.4rem",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  registerButton: {
    padding: "12px 35px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#ff9800",
    color: "white",
    border: "2px solid #ff9800",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  loginButton: {
    padding: "12px 35px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    border: "2px solid #007bff",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  registerButtonHover: {
    backgroundColor: "#e68900",
    borderColor: "#e68900",
    transform: "scale(1.08)",
  },
  loginButtonHover: {
    backgroundColor: "#0056b3",
    borderColor: "#0056b3",
    transform: "scale(1.08)",
  },
};

// 🔹 Function to apply hover effect dynamically
const hoverEffect = (e, style) => {
  Object.assign(e.target.style, style);
};

export default Home;
