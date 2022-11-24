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
  getProductByName = function(name){
    let sql = `select * from sanpham where TenSanPham = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, name, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDTheloai = function(IDTheLoai,page,size){
    const skip = (page - 1) * size;
    let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, IDTheLoai, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };
  // filerCAndK = function(category,kind_category,page,size){
  //   const skip = (page - 1) * size;
  //   let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
  //   return new Promise((resolve, reject)=>{
  //       this.db.query(sql, IDTheLoai, (err, data)=>{
  //           if(err) return reject(err);
  //           return resolve(data);
  //       });
  //   });
  // };
  // filerKandD = function(kind_category,date,page,size){
  //   const skip = (page - 1) * size;
  //   let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
  //   return new Promise((resolve, reject)=>{
  //       this.db.query(sql, IDTheLoai, (err, data)=>{
  //           if(err) return reject(err);
  //           return resolve(data);
  //       });
  //   });
  // };
  // filterCAndKAndD = function(category,kind_category,date,page,size){
  //   const skip = (page - 1) * size;
  //   let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
  //   return new Promise((resolve, reject)=>{
  //       this.db.query(sql, IDTheLoai, (err, data)=>{
  //           if(err) return reject(err);
  //           return resolve(data);
  //       });
  //   });
  // };
  // filerCAndD = function(category,kind_category,page,size){
  //   const skip = (page - 1) * size;
  //   let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
  //   return new Promise((resolve, reject)=>{
  //       this.db.query(sql, IDTheLoai, (err, data)=>{
  //           if(err) return reject(err);
  //           return resolve(data);
  //       });
  //   });
  // };
  // filterD = function(date,page,size){
  //   const skip = (page - 1) * size;
  //   let sql = `select * from sanpham where IDTheLoai = ? limit ${size} offset ${skip}`;
  //   return new Promise((resolve, reject)=>{
  //       this.db.query(sql, IDTheLoai, (err, data)=>{
  //           if(err) return reject(err);
  //           return resolve(data);
  //       });
  //   });
  // };
  getProductByIDNhaXuatBan = function(id){
    let sql = `select * from sanpham where IDNhaXuatBan = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDDanhMuc = function(idcategory,page,size){
    const skip = (page - 1) * size;
    let sql = `select * from sanpham
    where IDTheLoai IN(select IDTheLoai FROM theloai
                      WHERE IDDanhMuc = ?) limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, idcategory, (err, data)=>{
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
    const sql = `SELECT sanpham.*, theloai.TenTheLoai,danhmuc.IDDanhMuc,danhmuc.TenDanhMuc FROM sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };
  filter = function(filter,page,size){
    const skip = (page - 1) * size;
    const sql = `SELECT sanpham.*, theloai.TenTheLoai,danhmuc.IDDanhMuc,danhmuc.TenDanhMuc FROM sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc ${filter} limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };
  countFilter = function(filter){
    const sql = `select count(IDSanPham) as soluong from sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc ${filter}`;
    return new Promise((resolve,reject)=>{
      this.db.query(sql,(err,result)=>{
        if(err) return reject(err);
        return resolve(result);
      })
    })
  };
}



module.exports = ProductModel;