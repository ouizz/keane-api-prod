module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        lineid: String,
        displayname: String,
        timestamp: Date,
        createddate : Date
      },
      { timestamps: false }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    return mongoose.model("lineuser", schema);
  };
  