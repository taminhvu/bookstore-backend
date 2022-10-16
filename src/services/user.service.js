const {User} = require('../models');
const Response = require('../utils/Response');
const DB = require('../utils/DB_Define');
const bcrypt = require('bcrypt');
const user = new User();
const Define = require('../utils/Define');

const createUser = async(userBody)=>{
   const {Email,HoTen,MatKhau,GioiTinh,NgaySinh} = userBody;
   const check = await user.getUserByEmail(Email);
   if(check.length !=0){ 
     throw new  Response(true,'Email already use');
   } 
   const hashpass =  bcrypt.hashSync(MatKhau,bcrypt.genSaltSync(10));
   const obj = {
      Quyen:1,
      Email,
      HoTen,
      MatKhau: hashpass,
      GioiTinh,
      NgaySinh,
      TrangThai:1,
   };
   return user.addData(DB.user_table,obj);
}

const getUserByEmail = async(Email)=>{
   return user.getUserByEmail(Email);
}
const getAllUser = async ()=>{
   return user.getAll(DB.user_table,"IDNguoiDung");
}

const getUserById = async (id)=>{
   return user.getUserById(id);
}

const updateUserById = async (id,obj)=>{
   const result = await user.getUserById(id);
   if(result.length === 0){
      throw new Response(true,"Not Found");
   }
   return user.updateUserById(id,obj);
}

const getUserPagination = async(page)=>{
   const data = await user.getUserPagination(page);
   const amountUser = await user.countAll(DB.user_table);
   const amountPage = amountUser[0].soluong / Define.USER_PAGE_SIZE;
   return {DanhSach:data,TongNguoiDung:amountUser[0].soluong,SoLuongTrang:amountPage,TrangHienTai:page};
}

// const deleteUserById = async (id)=>{
//    const result = await user.getUserById(id);
//    if(result.length === 0){
//       throw new Response(true,"Not Found");
//    }
//    return user.deleteData(DB.user_tableid);
// }

module.exports = {
   createUser,
   getUserByEmail,
   getUserById,
   updateUserById,
   getAllUser,
   getUserPagination,
};