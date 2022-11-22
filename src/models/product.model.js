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

  getTopTenBestsellerPerDay = function(day){
    let sql = `select sanpham.*,
    SUM(chitietdonhang.SoLuong) as soluong
    from sanpham
    LEFT JOIN chitietdonhang
    on sanpham.IDSanPham = chitietdonhang.IDSanPham
    LEFT JOIN donhang
    on chitietdonhang.IDDonHang = donhang.IDDonHang
    WHERE donhang.TrangThai = 1 and donhang.NgayDat BETWEEN ? and CURRENT_DATE
    GROUP BY sanpham.IDSanPham
    ORDER BY soluong DESC
    LIMIT 10`;
    return new Promise((resolve,reject)=>{
        this.db.query(sql,day,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductPagination = function(page,size){
    const skip = (page - 1) * size;
    const sql = `select * from sanpham order by IDSanPham limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };
}

module.exports = ProductModel;