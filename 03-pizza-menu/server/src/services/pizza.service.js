import Pizza from "../models/pizza.model.js";

export const getAllPizza = async () => {
  try {
    const pizzas = await Pizza.find();
    return pizzas;
  } catch (err) {
    throw new Error("Get pizza fail");
  }
};
