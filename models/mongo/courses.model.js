module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        child_id: String,
        course_name: String,
        total: Number,
        price: Number,
        note: String,
        created_date : Date
      },
      { timestamps: false }
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    return mongoose.model("course", schema);
  };
  