import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 0 }, // STOCK
});

export default mongoose.model("Menu", MenuSchema);
