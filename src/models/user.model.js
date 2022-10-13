const Model = require("./Model");

class UserModel extends Model {
  getUserByEmail = function (table, email) {
    let sql = `select * from ${table} where email='${email}'`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  getUserById = function(table,id) {
    let sql = `select * from ${table} where idnguoidung =${id}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

module.exports = UserModel;
