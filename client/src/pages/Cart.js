/* ─────────────────────── Cart.js (client) ─────────────────────── */
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const token           = localStorage.getItem("token");

  /* ────────── FETCH CART ────────── */
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch(()  => setCart({ items: [] }));
  }, [token]);

  /* ────────── REMOVE (or –1) ────────── */
  const removeItem = async (foodId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${foodId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const total = cart.items.reduce(
    (sum, i) => sum + i.food.price * i.qty,
    0
  );

  /* ────────── CHECKOUT CLICK ────────── */
  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    alert("🎉  Thank you for your purchase! Your order is on its way.");
    // 👉  If later you want to call a backend /payment endpoint, do it here.
  };

  /* ─────────────── UI ─────────────── */
  return (
    <section style={s.bg}>
      <div style={s.card}>
        <h2 style={s.title}>
          <span style={s.cartIcon}>🛒</span> Your Cart
        </h2>

        {cart.items.length === 0 ? (
          <p style={s.empty}>Your cart is still empty.</p>
        ) : (
          <>
            <div style={s.tableHead}>
              <span style={{ flex: 2 }}>Product</span>
              <span style={{ flex: 1, textAlign: "center" }}>Qty</span>
              <span style={{ flex: 1, textAlign: "right" }}>Subtotal</span>
              <span style={{ width: 24 }} />
            </div>

            {cart.items.map((item) => (
              <div key={item.food._id} style={s.row}>
                <span style={{ flex: 2 }}>{item.food.name}</span>
                <span style={{ flex: 1, textAlign: "center" }}>{item.qty}</span>
                <span style={{ flex: 1, textAlign: "right" }}>
                  ₹{item.food.price * item.qty}
                </span>
                <button
                  aria-label="remove"
                  onClick={() => removeItem(item.food._id)}
                  style={s.deleteBtn}
                >
                  ✕
                </button>
              </div>
            ))}

            <hr style={s.hr} />
            <div style={s.totalRow}>
              <span>Total</span>
              <span style={s.totalPrice}>₹{total}</span>
            </div>

            {/* ───── BUY BUTTON ───── */}
            <button
              onClick={handleCheckout}
              style={{
                ...s.buyBtn,
                opacity: cart.items.length === 0 ? 0.5 : 1,
                cursor: cart.items.length === 0 ? "not-allowed" : "pointer",
              }}
              disabled={cart.items.length === 0}
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </section>
  );
};

/* ────────────────── STYLES ────────────────── */
const s = {
  bg: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 15px",
    background:
      "linear-gradient(120deg,#e5f8e8 0%,#d1f0d9 35%,#b6e5c3 70%,#9ad9ae 100%)",
  },
  card: {
    width: "100%",
    maxWidth: 540,
    padding: "32px 28px",
    borderRadius: 24,
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.16)",
    color: "#18452b",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: 700,
    fontSize: "1.75rem",
  },
  cartIcon: { marginRight: 6 },
  empty:    { textAlign: "center", fontStyle: "italic", opacity: 0.85 },
  tableHead: {
    display: "flex",
    padding: "6px 0 10px",
    fontWeight: 600,
    borderBottom: "1px solid rgba(255,255,255,0.35)",
  },
  row: {
    display: "flex",
    padding: "10px 0",
    fontSize: "0.96rem",
    alignItems: "center",
  },
  deleteBtn: {
    width: 24,
    height: 24,
    marginLeft: 4,
    border: "none",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    cursor: "pointer",
    lineHeight: "20px",
    fontSize: 14,
  },
  hr: {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.25)",
    margin: "10px 0 18px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,
    fontSize: "1.25rem",
    marginBottom: 18,
  },
  totalPrice: { color: "#0d572f" },

  /* BUY BUTTON */
  buyBtn: {
    width: "100%",
    padding: "12px 0",
    border: "none",
    borderRadius: 18,
    fontSize: "1rem",
    fontWeight: 700,
    background: "#2ecc71",
    color: "#fff",
    transition: "0.25s",
  },
};

export default Cart;
