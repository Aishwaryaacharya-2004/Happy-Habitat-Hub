import { useState } from "react";

const PetCard = ({ pet }) => {
  const [likes, setLikes] = useState(pet.likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required!");
      return;
    }

    try {
      const response = await fetch(`path`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error in liking pet:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        <img src={`http://localhost:5000${pet.imageUrl}`} alt="Pet" style={styles.image} />
        <p style={styles.text}><strong>Description:</strong> {pet.description || "No description provided."}</p>
        <p style={styles.text}><strong>Uploaded by:</strong> {pet.uploadedBy?.name || "Unknown"}</p>
        <p style={styles.text}><strong>Uploaded on:</strong> {new Date(pet.uploadedAt).toLocaleDateString()}</p>
        <button
          onClick={handleLike}
          style={isHovered ? { ...styles.likeButton, ...styles.likeButtonHover } : styles.likeButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ❤️ {likes} Likes
        </button>
      </div>
    </div>
  );
};

// 🌿 Styling
const styles = {
  pageBackground: {
    background: "linear-gradient(135deg, #8BC34A, #558B2F)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "280px",
    padding: "20px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    border: "2px solid white",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "8px",
  },
  likeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  likeButtonHover: {
    backgroundColor: "#FFEB3B",
    transform: "scale(1.1)",
    color: "#2f3e1d",
  },
};

export default PetCard;
