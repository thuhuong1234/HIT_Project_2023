class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //copy obj
    const queries = { ...this.queryString };
    //excludeFields
    const fields = ["limit", "sort", "page", "fields"];
    fields.forEach((el) => {
      delete queries[el];
    });
    //format operator to correct syntax in Mongoose
    let queryStr = JSON.stringify(queries);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const formatedQueries = JSON.parse(queryStr);
    //filtering
    if (queries?.name)
      formatedQueries.name = { $regex: queries.name, $options: "i" };
    this.query = this.query.find(formatedQueries);

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
