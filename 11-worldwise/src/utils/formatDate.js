const formatDate = (date) => {
  // const dateFormat = new Date(date).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });
  if (!date) return;
  const format = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
  return format;
};

export default formatDate;
