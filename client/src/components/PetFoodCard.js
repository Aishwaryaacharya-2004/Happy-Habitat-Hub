import axios from "axios";
import { useState } from "react";

const PetFoodCard = ({ food }) => {
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    try {
      setAdding(true);
      await axios.post(
        `http://localhost:5000/api/cart/add/${food._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${food.name} added to cart 🛒`);
    } catch (err) {
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={styles.card}>
      <img
        src={`http://localhost:5000${food.imageUrl}`}
        alt={food.name}
        style={styles.img}
      />
      <h4>{food.name}</h4>
      <p>Price: ₹{food.price}</p>
      <button
        style={styles.btn}
        disabled={adding}
        onClick={addToCart}
      >
        {adding ? "Adding…" : "Buy Now"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    width: 200,
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
  },
  img: { width: "100%", height: 120, objectFit: "cover" },
  btn: {
    marginTop: 8,
    padding: "6px 12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default PetFoodCard;
