import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    quantity: ""
  });
  const [editId, setEditId] = useState(null);

  const loadItems = async () => {
    const res = await axios.get("http://localhost:5000/menu");
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async () => {
  try {
    if (editId) {
      // Update endpoint
      await axios.put(`http://localhost:5000/menu/update/${editId}`, form);
      setEditId(null);
    } else {
      // Add endpoint
      await axios.post("http://localhost:5000/menu/add", form);
    }
    setForm({ name: "", price: "", image: "", quantity: "" });
    loadItems();
  } catch (err) {
    console.error("Error saving item:", err);
    alert("Failed to save item. Check server logs.");
  }
};


  const editItem = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/menu/delete/${id}`);
    loadItems();
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard - Manage Menu</h2>

      <div className="admin-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />
        <button onClick={saveItem}>
          {editId ? "Update Item" : "Add Item"}
        </button>
      </div>

      <hr />

      <h3>Existing Items</h3>

      <div className="items-list">
        {items.map(item => (
          <div className="item-card" key={item._id}>
            <div className="item-info">
              <p>{item.name} - ₹{item.price} - Stock: {item.quantity}</p>
            </div>
            <div className="item-actions">
              <button className="edit" onClick={() => editItem(item)}>Edit</button>
              <button className="delete" onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
