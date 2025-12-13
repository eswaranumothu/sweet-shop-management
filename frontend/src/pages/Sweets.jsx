import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import "./Sweets.css";

function Sweets({ onLogout }) {
  const [sweets, setSweets] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  // 🔐 ADMIN CHECK
  const isAdmin = localStorage.getItem("role") === "admin";

  // ➕ ADD SWEET STATE (ADMIN)
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // 🔢 RESTOCK QUANTITY PER SWEET (ADMIN)
  const [restockQty, setRestockQty] = useState({});

  // 🔄 LOAD SWEETS
  const loadSweets = useCallback(async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  }, []);

  useEffect(() => {
    loadSweets();
  }, [loadSweets]);

  // 🛒 BUY SWEET (USER ONLY)
  const buySweet = async (sweet) => {
    await api.post(`/api/sweets/${sweet.id}/purchase?quantity=1`);

    // 💰 UPDATE TOTAL BILL
    setTotalBill((prev) => prev + sweet.price);

    loadSweets();
  };

  // 🔄 RESTOCK SWEET (ADMIN – FLEXIBLE QTY)
  const restockSweet = async (id) => {
    const qty = restockQty[id];

    if (!qty || qty <= 0) {
      alert("Enter valid restock quantity");
      return;
    }

    await api.post(`/api/sweets/${id}/restock?quantity=${qty}`);

    // Clear input after restock
    setRestockQty({ ...restockQty, [id]: "" });

    loadSweets();
  };

  // ✏️ UPDATE SWEET (ADMIN)
  const updateSweet = async (id) => {
    await api.put(`/api/sweets/${id}`, {
      price: 200,
      quantity: 100,
    });
    loadSweets();
  };

  // ➕ ADD SWEET (ADMIN)
  const addSweet = async () => {
    try {
      await api.post("/api/sweets", {
        name: newSweet.name,
        category: newSweet.category,
        price: Number(newSweet.price),
        quantity: Number(newSweet.quantity),
      });

      setNewSweet({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });

      loadSweets();
    } catch (err) {
      alert("Only admin can add sweets");
    }
  };

  return (
    <div>
      <h2>Sweets</h2>
      <button onClick={onLogout}>Logout</button>
      <hr />

      {/* 💰 TOTAL BILL (USER) */}
      {!isAdmin && <h3>Total Bill: ₹{totalBill}</h3>}
      <hr />

      {/* ➕ ADD SWEET FORM (ADMIN ONLY) */}
      {isAdmin && (
        <>
          <h3>Add New Sweet (Admin)</h3>

          <input
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) =>
              setNewSweet({ ...newSweet, name: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={newSweet.category}
            onChange={(e) =>
              setNewSweet({ ...newSweet, category: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={newSweet.price}
            onChange={(e) =>
              setNewSweet({ ...newSweet, price: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            value={newSweet.quantity}
            onChange={(e) =>
              setNewSweet({ ...newSweet, quantity: e.target.value })
            }
          />

          <button onClick={addSweet}>Add Sweet</button>
          <hr />
        </>
      )}

      {/* 🍭 SWEETS LIST */}
      {<div className="sweets-grid">
  {sweets.map((s) => (
    <div key={s.id} className="sweet-card">
      <b>{s.name}</b>
      <div className="sweet-info">
        Price: ₹{s.price} | Qty: {s.quantity}
      </div>

      <div className="sweet-actions">
        {/* USER BUY BUTTON */}
        {!isAdmin && (
          <button
            disabled={s.quantity === 0}
            onClick={() => buySweet(s)}
          >
            Buy 1
          </button>
        )}

        {/* ADMIN CONTROLS */}
        {isAdmin && (
          <>
            <input
              type="number"
              placeholder="Qty"
              value={restockQty[s.id] || ""}
              onChange={(e) =>
                setRestockQty({
                  ...restockQty,
                  [s.id]: e.target.value,
                })
              }
            />
            <button onClick={() => restockSweet(s.id)}>Restock</button>

            <button onClick={() => updateSweet(s.id)}>Update</button>
          </>
        )}
      </div>
    </div>
  ))}
</div>}
    </div>
  );
}

export default Sweets;
