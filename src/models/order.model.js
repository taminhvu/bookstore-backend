const Model = require("./Model");

class orderModel extends Model{
    getOrderByID = function(id){
        let sql = `select donhang.*,
        SUM(chitietdonhang.SoLuong) as SoLuong,
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as Tong
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        WHERE donhang.IDDonHang = ?
        GROUP BY donhang.IDDonHang `;
        return new Promise((resolve, reject)=>{
            this.db.query(sql, id, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };

      getAllOrder = function(){
        let sql = `select donhang.*,
        SUM(chitietdonhang.SoLuong) as SoLuong,
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as Tong
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        GROUP BY donhang.IDDonHang `;
        return new Promise((resolve, reject)=>{
            this.db.query(sql, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };

      getOrderDetailByIDOrder = function(ID){
        let sql = `select chitietdonhang.*,sanpham.TenSanPham,sanpham.HinhAnh,
		(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as Tong
        from chitietdonhang 
        LEFT JOIN sanpham
        on chitietdonhang.IDSanPham = sanpham.IDSanPham
        WHERE chitietdonhang.IDDonHang = ?
        GROUP BY chitietdonhang.IDChiTietDonHang`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,ID, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };


    getRevanue = function(date){
        let sql = `select
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as DoanhThu
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN ? AND CURRENT_DATE
        UNION
        select
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as DoanhThu
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN DATE_SUB(?, INTERVAL 1 WEEK) AND DATE_SUB(?, INTERVAL 1 DAY);`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,[date,date,date], (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };
      getRevanuePerDay = function(date){
        let sql = `select donhang.NgayDat,donhang.PhiShip,
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as DoanhThu
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN ? AND CURRENT_DATE
        GROUP by donhang.NgayDat`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,date, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };
    getAmount = function(date){
        let sql = `select
        COUNT(donhang.IDDonHang) as TongDon
        from donhang 
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN ? AND CURRENT_DATE
        UNION
        select
        COUNT(donhang.IDDonHang) as TongDon
        from donhang 
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN DATE_SUB(?, INTERVAL 1 WEEK) AND DATE_SUB(?, INTERVAL 1 DAY);`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,[date,date,date], (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };

      getAmountPerDay = function(date){
        let sql = `select donhang.NgayDat,
        COUNT(donhang.IDDonHang) as TongDon
        from donhang 
        WHERE donhang.TrangThai = 1 and donhang.NgayDat 
        BETWEEN  ? AND CURRENT_DATE
        GROUP BY donhang.NgayDat;`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,[date,date,date], (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };

      getOrderPagination = function(page,size){
        const skip = (page - 1) * size;
        const sql = `select donhang.*,
        SUM(chitietdonhang.SoLuong) as SoLuong,
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as Tong
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        GROUP BY donhang.IDDonHang limit ${size} offset ${skip}`;
        return new Promise((resolve, reject)=>{
          this.db.query(sql,(err ,data)=>{
            if(err) return reject(err);
            return resolve(data);
          });
        });
      };

      getOrderByIDUser = function(id){
        let sql = `select donhang.*,
        SUM(chitietdonhang.SoLuong) as SoLuong,
        SUM(chitietdonhang.GiaBan * chitietdonhang.SoLuong) as Tong
        from donhang 
        LEFT JOIN chitietdonhang
        on donhang.IDDonHang = chitietdonhang.IDDonHang
        WHERE donhang.IDNguoiDung = ?
        GROUP BY donhang.IDDonHang`;
        return new Promise((resolve, reject)=>{
            this.db.query(sql,id, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
      };
}
module.exports = orderModel;