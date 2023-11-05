import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photoName: {
    type: String,
    default: "pizza-default.jpg",
  },
  soldOut: {
    type: Boolean,
    default: false,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
