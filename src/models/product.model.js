const { resolve } = require("path");
const Model = require("./Model");

class ProductModel extends Model {
  addProduct = function (obj) {
    let sql = `INSERT INTO sanpham SET ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, obj, (err, data) => {
        if (err) return reject(err);
        return reslove(data);
      });
    });
  };

  getProbuctByID = function(id){
    let sql = `select * from sanpham where IDSanPham = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getAllProduct = function(){
    let sql = 'select * from sanpham';
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }
}

module.exports = ProductModel;