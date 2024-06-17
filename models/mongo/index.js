const dbConfig = require("../../config/db.mongo");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model")(mongoose);
db.childs = require("./childs.model")(mongoose);
db.courses = require("./courses.model")(mongoose);

// db.projects = require("./projects.model")(mongoose);
// db.project_members = require("./project_members.model")(mongoose);
// db.exports = require("./exports.model")(mongoose);
module.exports = db;