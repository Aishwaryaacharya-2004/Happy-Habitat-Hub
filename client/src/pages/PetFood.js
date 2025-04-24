import { useEffect, useState } from "react";
import axios from "axios";
import PetFoodCard from "../components/PetFoodCard";

const PetFood = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/food")
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Buy Pet Food 🍖🐕</h1>
      <div style={grid}>
        {foodItems.map((item) => (
          <PetFoodCard key={item._id} food={item} />
        ))}
      </div>
    </div>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 20,
};

export default PetFood;
