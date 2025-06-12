import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PetCard from "../components/PetCard.js";
import "./Gallery.css"; // Importing CSS for styling

const Home = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("path", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPets(res.data))
      .catch((err) => {
        console.error("Error fetching pets:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="title">Welcome to Pet Lovers 🐶🐱</h1>
      <p className="subtitle">Discover adorable pets shared by our community!</p>

      {pets.length > 0 ? (
        <div className="grid">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <p className="no-pets">No pets available yet. Be the first to upload!</p>
      )}
    </div>
  );
};

export default Home;
