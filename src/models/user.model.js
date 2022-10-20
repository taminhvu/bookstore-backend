const { resolve } = require("path");
const Define = require("../utils/Define");
const Model = require("./Model");
class UserModel extends Model {

  getUserByEmail = function (email) {
    let sql = `select * from nguoidung where email=?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,email,(err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  getUserById = function(id) {
    let sql = `select * from nguoidung where idnguoidung = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,id, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
  updateUserById = function(id,obj){
    let sql = `UPDATE nguoidung SET ? WHERE IDNguoiDung = ?`;
    return new Promise((reslove,reject)=>{
        this.db.query(sql, [obj,id], (err)=>{
            if(err)reject(err);
            return reslove();
        });
    });
  };
  getUserPagination = function(page){
    const size = Define.USER_PAGE_SIZE;
    const skip = (page - 1) * size;
    const sql = `select IDNguoiDung,Quyen,Email,HoTen,DATE_FORMAT(NgaySinh,"%d-%m-%Y") as NgaySinh,GioiTinh,Anh,XacThuc,TrangThai from nguoidung order by IDNguoiDung limit ${size} offset ${skip} `;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };

}


module.exports = UserModel;
