import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const travelItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  packed: {
    type: Boolean,
    default: false,
  },
});

const TravelItem = mongoose.model("TravelItem", travelItemSchema);

app.get("/api/v1/travels", async (req, res) => {
  const travelItems = await TravelItem.find();

  res.json({
    status: "success",
    travelItems,
  });
});

app.post("/api/v1/travels", async (req, res) => {
  try {
    const newTravelItem = await TravelItem.create(req.body);

    res.status(201).json({
      status: "success",
      newTravelItem,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/api/v1/travels/:id", async (req, res) => {
  try {
    const newTravelItem = await TravelItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        travelItem: newTravelItem,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v1/travels/:id", async (req, res) => {
  try {
    await TravelItem.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v1/travels", async (req, res) => {
  try {
    await TravelItem.deleteMany();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
});

export default app;
