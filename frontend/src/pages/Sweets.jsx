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
  // 🔍 SEARCH STATE
const [search, setSearch] = useState({
  name: "",
  category: "",
  min_price: "",
  max_price: "",
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
  // 🔍 SEARCH SWEETS
const searchSweets = async () => {
  try {
    const params = {};

    if (search.name) params.name = search.name;
    if (search.category) params.category = search.category;
    if (search.min_price) params.min_price = search.min_price;
    if (search.max_price) params.max_price = search.max_price;

    const res = await api.get("/api/sweets/search", { params });
    setSweets(res.data);
  } catch (err) {
    console.error(err);
    alert("Search failed");
  }
};


  // ✏️ UPDATE SWEET (ADMIN)
  const updateSweet = async (id) => {
    await api.put(`/api/sweets/${id}`, {
      price: 200,
      quantity: 100,
    });
    loadSweets();
  };

  const deleteSweet = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this sweet?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/api/sweets/${id}`);
    loadSweets(); // refresh list
  } catch (err) {
    console.error(err);
    alert("Delete failed. Admin access required.");
  }
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
  <div className="page-bg">
    <div className="page-content">

      {/* 🔷 TOP BAR */}
      <div className="top-bar">
        <h2 className="app-title">🍬 Sweet Shop</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* 💰 TOTAL BILL (USER) */}
      {!isAdmin && <h3>Total Bill: ₹{totalBill}</h3>}
      <hr />

      {/* ➕ ADD SWEET FORM (ADMIN ONLY) */}
      {isAdmin && (
        <>
          <h3>Add New Sweet (Admin)</h3>

          <div className="search-bar">
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
          </div>

          <hr />
        </>
      )}

      {/* 🔍 SEARCH BAR */}
      <div className="search-bar">
        <input
          placeholder="Search by name"
          value={search.name}
          onChange={(e) =>
            setSearch({ ...search, name: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={search.category}
          onChange={(e) =>
            setSearch({ ...search, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Min Price"
          value={search.min_price}
          onChange={(e) =>
            setSearch({ ...search, min_price: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={search.max_price}
          onChange={(e) =>
            setSearch({ ...search, max_price: e.target.value })
          }
        />

        <button onClick={searchSweets}>Search</button>
        <button onClick={loadSweets}>Clear</button>
      </div>

      {/* 🍭 SWEETS GRID */}
      <div className="sweets-grid">
        {sweets.map((s) => (
          <div key={s.id} className="sweet-card">
            <b>{s.name}</b>

            <div className="sweet-info">
              Price: ₹{s.price} | Qty: {s.quantity}
            </div>

            <div className="sweet-actions">
              {!isAdmin && (
                <button
                  disabled={s.quantity === 0}
                  onClick={() => buySweet(s)}
                >
                  Buy
                </button>
              )}

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

                  <button
                    className="delete-btn"
                    onClick={() => deleteSweet(s.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

}

export default Sweets;
