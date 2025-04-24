import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const trailContainer = document.createElement("div");
    trailContainer.style.position = "fixed";
    trailContainer.style.top = 0;
    trailContainer.style.left = 0;
    trailContainer.style.pointerEvents = "none";
    trailContainer.style.zIndex = 9999;
    document.body.appendChild(trailContainer);

    const createTrail = (x, y) => {
      const trail = document.createElement("div");
      trail.style.position = "absolute";
      trail.style.width = "12px";
      trail.style.height = "12px";
      trail.style.borderRadius = "50%";
      trail.style.background = "rgba(50, 205, 50, 0.7)";
      trail.style.boxShadow = "0 0 10px rgba(50, 205, 50, 0.8)";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.transform = "translate(-50%, -50%)";
      trail.style.transition = "opacity 0.5s ease";
      trailContainer.appendChild(trail);

      setTimeout(() => {
        trail.style.opacity = 0;
        setTimeout(() => trail.remove(), 500);
      }, 50);
    };

    const handleMouseMove = (e) => {
      createTrail(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(trailContainer);
    };
  }, []);

  const styles = {
    background: {
      minHeight: "100vh",
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
    },
    container: {
      textAlign: "center",
      padding: "40px",
      maxWidth: "800px",
      background: "rgba(240, 255, 244, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 128, 0, 0.2)",
      color: "#1a3d1a",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      animation: "fadeSlide 1s ease",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#2e8b57",
      marginBottom: "20px",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      marginBottom: "15px",
    },
    list: {
      textAlign: "left",
      margin: "20px auto",
      maxWidth: "600px",
      paddingLeft: "20px",
    },
    listItem: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.heading}>About PetHub</h2>
        <p style={styles.paragraph}>
          PetHub 🐾 is a green-tech inspired platform dedicated to connecting pets with loving owners through an interactive, easy-to-use system.
        </p>
        <p style={styles.paragraph}>
          We aim to make the adoption process seamless by helping users:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>🌍 Discover pet stores and adoption centers near them</li>
          <li style={styles.listItem}>🐶 Choose pets based on type and location preferences</li>
          <li style={styles.listItem}>📧 Receive real-time email updates with nearby options and store details</li>
          <li style={styles.listItem}>❤️ Become part of a pet-loving community</li>
        </ul>
        <p style={styles.paragraph}>
          Join us in making the world a better place for our furry friends, one adoption at a time!
        </p>
      </div>
    </div>
  );
};

export default About;
