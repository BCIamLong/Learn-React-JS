export const getQuestions = async () => {
  try {
    const res = await fetch("http://localhost:3333/questions");
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("No questions found!");
  }
};
