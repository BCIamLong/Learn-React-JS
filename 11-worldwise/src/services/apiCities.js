const BASE_URL = "http://localhost:3010";

export const getCities = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cities`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Fetch cities data error");
  }
};

export const getCity = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    // if (err.name === "AbortError") return;
    throw new Error("Fetch cities data error");
  }
};
