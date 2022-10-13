const Model = require("./Model");

class UserModel extends Model {
  getUserByEmail = function (table, email) {
    let sql = `select * from ?? where email=?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,[table,email],(err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  getUserById = function(table,id) {
    let sql = `select * from ?? where idnguoidung = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,[table,id], (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

module.exports = UserModel;
