class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const options = ["sort", "fields", "page", "limit"];
    const queryOb = { ...this.queryStr };
    options.forEach((op) => delete queryOb[op]);

    let queryObStr = JSON.stringify(queryOb);
    queryObStr.replace(/(gte|lte|gt|lt)/g, (match) => `$${match}`);

    if (this.queryStr.title)
      this.query = this.query.find({
        // title: { $regex: new RegExp(`^${this.queryStr.title}`, "i") },
        title: { $regex: new RegExp(this.queryStr.title, "i") },
      });
    else this.query = this.query.find(JSON.parse(queryObStr));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const queryOb = this.queryStr.sort.replaceAll(",", " ");
      this.query = this.query.sort(queryOb);
      return this;
    }
    this.query = this.query.sort("-createdAt");
    return this;
  }

  select() {
    if (this.queryStr.fields) {
      const queryOb = this.queryStr.fields.replaceAll(",", " ");
      this.query = this.query.select(queryOb);
      return this;
    }
    this.query = this.query.select("-__v");
    return this;
  }

  pagination(count) {
    const page = this.queryStr.page || 1;
    const limit = this.queryStr.limit || 10;
    const totalPages = Math.ceil(count / limit);
    const skip = limit * (page - 1);

    if (page <= totalPages) this.query.skip(skip).limit(limit);
    else throw new Error("Page not found");

    return this;
  }
}

export default APIFeatures;
