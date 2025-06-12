import { useState, useEffect } from "react";
import axios from "axios";
import petHeader from "../assets/petback.jpg"; // Make sure this path is correct

const UploadPet = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleUpload = async () => {
    if (!file || !description) return alert("Please provide image and description!");
    if (!token) return alert("You must be logged in to upload!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      await axios.post("path", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Pet uploaded!");
      setFile(null);
      setDescription("");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || "An error occurred"}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glassBox}>
        <img src={petHeader} alt="Pet" style={styles.image} />
        <h2 style={styles.heading}>Upload Pet Picture</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        <textarea
          placeholder="Enter pet description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "70px", resize: "none", padding: "10px" }}
        />
        <button
          onClick={handleUpload}
          style={styles.uploadButton}
          onMouseEnter={(e) => hoverEffect(e, styles.uploadButtonHover)}
          onMouseLeave={(e) => hoverEffect(e, styles.uploadButton)}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(135deg, #b5f7b2 0%, #dcff9c 100%)`,
    backgroundSize: "cover",
    padding: "30px",
    fontFamily: "'Comic Neue', cursive",
  },
  glassBox: {
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 32px rgba(50, 205, 50, 0.2)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    padding: "30px",
    width: "370px",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  heading: {
    color: "#2e7d32",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "'Comic Neue', cursive",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #b0f2b6",
    backgroundColor: "#f4fff0",
    color: "#2e7d32",
    fontSize: "14px",
    outline: "none",
    textAlign: "center",
    fontFamily: "'Comic Neue', cursive",
  },
  uploadButton: {
    backgroundColor: "#91e65e",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "12px 24px",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    fontFamily: "'Comic Neue', cursive",
  },
  uploadButtonHover: {
    backgroundColor: "#6ed234",
    color: "#ffffff",
    boxShadow: "0 0 12px 2px rgba(144,238,144,0.8)",
    transform: "scale(1.05)",
  },
};

const hoverEffect = (e, style) => {
  Object.assign(e.target.style, style);
};

export default UploadPet;
