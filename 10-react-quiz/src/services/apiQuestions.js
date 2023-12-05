// import { JSONPreset } from "lowdb/node";

export const getQuestions = async () => {
  try {
    const res = await fetch("http://localhost:3333/questions");
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
    await fetch("http://localhost:3333/highScore", {
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
    const res = await fetch("http://localhost:3333/highScore");
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("No questions found!");
  }
};
