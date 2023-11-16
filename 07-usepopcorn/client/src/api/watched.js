export const getWatched = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/watched");
    const data = await res.json();
    return data.data.watched;
  } catch (error) {
    console.log(error);
  }
};

export const getWatchedStats = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/v1/watched/stats");
    const data = await res.json();
    return data.data.stats;
  } catch (error) {
    console.log(error);
  }
};
