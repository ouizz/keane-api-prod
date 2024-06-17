module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        parent_id: String,
        fullname: String,
        nickname: String,
        dob:String,
        created_date : Date
      },
      { timestamps: false }
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    return mongoose.model("child", schema);
  };
  