import { BASE_URL } from "../config/serverApi";
// import { JSONPreset } from "lowdb/node";

export const getQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/questions`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("No questions found!");
  }
};

// const defaultData = { highScore: 0 };
// const db = await JSONPreset("../../data/db.json", defaultData);

export const postHighScore = async (score) => {
  try {
    await fetch(`${BASE_URL}/highScore`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score),
    });

    // db.data.highScore = score;
  } catch (err) {
    throw new Error("Add high score error!");
  }
};

export const getHighScore = async () => {
  try {
    const res = await fetch(`${BASE_URL}/highScore`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("No questions found!");
  }
};
