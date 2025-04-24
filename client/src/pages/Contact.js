import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const styles = {
    background: {
      minHeight: "100vh",
      backgroundImage:
        "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      background: "rgba(240, 255, 244, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 128, 0, 0.2)",
      padding: "40px",
      maxWidth: "1000px",
      gap: "40px",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    infoBox: {
      textAlign: "left",
      color: "#1a3d1a",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      flex: "1",
      minWidth: "300px",
    },
    heading: {
      fontSize: "2.2rem",
      color: "#2e8b57",
      marginBottom: "20px",
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.1rem",
      marginBottom: "15px",
      gap: "12px",
    },
    imageBox: {
      flex: "1",
      minWidth: "280px",
      textAlign: "center",
    },
    image: {
      width: "100%",
      maxWidth: "300px",
      borderRadius: "15px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.infoBox}>
          <h2 style={styles.heading}>Contact Us</h2>
          <div style={styles.infoItem}>
            <FaEnvelope color="#2e8b57" />
            <span>support@pethub.com</span>
          </div>
          <div style={styles.infoItem}>
            <FaPhoneAlt color="#2e8b57" />
            <span>+1234567890</span>
          </div>
          <div style={styles.infoItem}>
            <FaMapMarkerAlt color="#2e8b57" />
            <span>PetHub HQ, Bangalore, India</span>
          </div>
        </div>
        <div style={styles.imageBox}>
          <img
            style={styles.image}
            src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=870&q=80"
            alt="Cute Pet"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
