import { getAllPizza } from "../services/pizza.service.js";

export const getPizzaList = async (req, res) => {
  try {
    const pizza = await getAllPizza();
    res.status(200).json({
      status: "success",
      pizza,
    });
  } catch (err) {
    console.log(err);
  }
};
