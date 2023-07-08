const db = require("../db/mysql");
// const sequelize = db.sequelize;
const obj = new db();

class BaseRepository {
 async executeRawQuery(query) {
    console.log("Base Class");
    const Sequelize = obj.connectDB();
    return await Sequelize.query(query)
  }
}

module.exports = BaseRepository;
