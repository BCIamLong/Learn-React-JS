import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "90kb" }));

const billSchema = new mongoose.Schema({
  payer: {
    type: String,
    required: true,
  },
  billVal: {
    type: Number,
    required: true,
  },
  myExpense: {
    type: Number,
    required: true,
  },
  owe: {
    type: Number,
    required: true,
  },
  person: {
    type: mongoose.Schema.ObjectId,
    ref: "Person",
  },
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const Bill = mongoose.model("Bill", billSchema);
const Person = mongoose.model("Person", personSchema);
const Image = mongoose.model("Image", imageSchema);

app.get("/api/v1/persons", async (req, res) => {
  try {
    // const persons = await Person.find();
    const persons = await Person.aggregate([
      {
        $lookup: {
          from: "bills",
          localField: "_id",
          foreignField: "person",
          as: "bill",
        },
      },
    ]);

    res.json({
      status: "success",
      data: {
        persons,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/persons/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    res.json({
      status: "success",
      data: {
        person,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/persons", async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        person: newPerson,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      error,
    });
  }
});

app.patch("/api/v1/persons/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "success",
      data: {
        person,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      error,
    });
  }
});

app.get("/api/v1/images", async (req, res) => {
  try {
    console.log("hello");
    const image = await Image.aggregate([
      {
        $sample: { size: 1 },
      },
    ]);

    res.json({
      status: "success",
      data: {
        image,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/bills", async (req, res) => {
  try {
    const newBill = await Bill.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bill: newBill,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      error,
    });
  }
});

app.get("/api/v1/persons/:personId/bills", async (req, res) => {
  try {
    const bill = await Bill.findOne({ person: req.params.personId });
    res.json({
      status: "success",
      data: {
        bill,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      error,
    });
  }
});

export default app;
