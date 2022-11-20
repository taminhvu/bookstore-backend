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

  getProductByID = function(id){
    let sql = `select * from sanpham where IDSanPham = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDTheloai = function(id){
    let sql = `select * from sanpham where IDTheLoai = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDNhaXuatBan = function(id){
    let sql = `select * from sanpham where IDNhaXuatBan = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDDanhMuc = function(id){
    let sql = `select * from sanpham
    where IDTheLoai IN(select IDTheLoai FROM theloai
                      WHERE IDDanhMuc = ?)`;
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

  getNewProduct = function(){
    let sql = "SELECT * FROM `sanpham` WHERE NgayThem BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH) AND CURRENT_DATE";
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }

  getBestseller = function(){
    let sql = `select sanpham.*,
    SUM(chitietdonhang.SoLuong) as soluong
    from sanpham
    LEFT JOIN chitietdonhang
    on sanpham.IDSanPham = chitietdonhang.IDSanPham
    GROUP BY sanpham.IDSanPham
    ORDER BY soluong DESC`;
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }
}

module.exports = ProductModel;