import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adopt = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    petType: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setStores([]);

    try {
      const response = await axios.post("http://localhost:5000/api/adopt", formData);
      setLoading(false);

      if (response.status === 200) {
        setSuccess("🎉 Adoption request submitted! Check your email for details.");
        setStores(response.data.shops); // Update based on backend response (shops)
        setFormData({ name: "", email: "", petType: "", location: "", message: "" });
      } else {
        setError("❌ Submission failed.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Submission Error:", err);
      setError(err.response?.data?.error || "❌ Error submitting form. Please try again.");
    }
  };

  const styles = {
    container: {
  textAlign: "center",
  padding: "30px 20px",
  maxWidth: "600px",
  margin: "40px auto",
  background: "radial-gradient(circle at center, #d4f5d4, #b4e7b4, #a0dca0)", // 🌿 Radial green gradient
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', sans-serif",
},

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "12px 16px",
      border: "2px solid #d6f5d6",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      background: "#ffffff",
      transition: "border 0.3s ease-in-out",
    },
    textarea: {
      height: "100px",
      resize: "none",
    },
    button: {
      background: "#45c04a",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease-in-out",
    },
    storeCard: {
      background: "#fff",
      marginTop: "20px",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      textAlign: "left",
    },
    storeImage: {
      width: "100%",
      maxHeight: "180px",
      objectFit: "cover",
      borderRadius: "8px",
      marginTop: "10px",
    },
    storeLink: {
      color: "#1a73e8",
      textDecoration: "underline",
      fontWeight: "500",
    },
    alert: {
      padding: "12px",
      marginTop: "20px",
      borderRadius: "8px",
      fontWeight: "bold",
      textAlign: "center",
    },
    success: {
      background: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    error: {
      background: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
  };
  

  return (
    <div style={styles.container}>
      <h2>🐾 Adopt a Pet</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="petType"
          placeholder="Preferred Pet Type (e.g., Dog, Cat)"
          required
          value={formData.petType}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Your Location (City or Area)"
          required
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Additional Notes or Requirements"
          value={formData.message}
          onChange={handleChange}
          style={{ ...styles.input, ...styles.textarea }}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ Messages */}
      {error && <div style={{ ...styles.alert, ...styles.error }}>{error}</div>}
      {success && <div style={{ ...styles.alert, ...styles.success }}>{success}</div>}

      {/* ✅ Store Cards */}
      {stores && stores.length > 0 ? (
        <div>
          <h3>📍 Nearby Pet Stores</h3>
          {stores.map((store, index) => (
            <div key={index} style={styles.storeCard}>
              <h4>{store.name}</h4>
              <p>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${store.lat}&mlon=${store.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.storeLink}
                >
                  View Location on Map
                </a>
              </p>
              <img
                src={store.image || "/petstore.jpg"}
                alt={store.name}
                style={styles.storeImage}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No nearby pet stores found.</p>
      )}
    </div>
  );
};

export default Adopt;
