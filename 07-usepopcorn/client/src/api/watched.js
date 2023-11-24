export const getWatched = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/watched");
    const data = await res.json();
    return data.data.watched;
  } catch (error) {
    console.log(error);
  }
};

export const getWatchedDetail = async (id) => {
  try {
    const res = await fetch(`http://localhost:3100/api/v1/watched/${id}`);
    const data = await res.json();
    // console.log(data);
    return data.data.watched;
  } catch (error) {
    throw new Error("Something went wrong when fetching watched detail");
  }
};

export const getWatchedStats = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/watched/stats");
    const data = await res.json();
    return data.data.stats;
  } catch (error) {
    throw new Error("Something went wrong when fetching watched stats");
  }
};

export const createWatched = async (watched) => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watched),
    });
    const data = await res.json();
    return data.data.newWatched;
  } catch (error) {
    throw new Error("Something went wrong with create new watched");
  }
};

export const deleteWatched = async (id) => {
  try {
    await fetch(`http://localhost:3100/api/v1/watched/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error("Something went wrong when delete watched");
  }
};
