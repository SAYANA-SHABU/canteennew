import express from "express";
import cors from "cors";
import connectDB from "./connection.js";
import Menu from "./models/menu.js";
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Admin login route
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Hardcoded admin credentials (should be stored securely in production)
    if (username === 'admin' && password === '12345') {
      res.json({ message: 'Admin login successful' })
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' })
    }
  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({ message: 'Server error during admin login' })
  }
})



// Add menu item
app.post("/menu/add", async (req, res) => {
  try {
    const item = new Menu(req.body);
    await item.save();
    res.json({ message: "Item added", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Get all menu items
app.get("/menu", async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Buy item (decrease stock)
app.put("/menu/buy/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    if (item.quantity <= 0) return res.status(400).json({ error: "Out of stock" });

    item.quantity -= 1;
    await item.save();
    res.json({ message: "Purchase successful", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
});

// Update menu item
app.put("/menu/update/:id", async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item updated", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete menu item
app.delete("/menu/delete/:id", async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
