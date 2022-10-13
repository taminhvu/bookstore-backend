const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const DB = require('../utils/DB_Define');

const user = new User();

const createUser = async(userBody)=>{
   const {Email,HoTen,MatKhau,GioiTinh,NgaySinh} = userBody;
   const check = await user.getUserByEmail(DB.user_table.name,Email)
   if(check.length !=0){ 
     throw new ApiError(httpStatus.BAD_REQUEST,"Email already taken");
   }
   const obj = {
      Quyen:'1',
      Email,
      HoTen,
      MatKhau,
      GioiTinh,
      NgaySinh,
   };
   return user.addData(DB.user_table.name,obj);
}

const getAllUser = async ()=>{
   return await user.getAll(DB.user_table.name);
}

const getUserById = async (id)=>{
   return user.getOne(DB.user_table.name, DB.user_table.field.id, id);
}

const deleteUser = async (id)=>{
   const result = await user.getOne(DB.user_table.name,DB.user_table.field.id);
   if(result.length === 0){
      throw new ApiError(httpStatus.NOT_FOUND,"Khong tim thay id");
   }
   return user.deleteData(DB.user_table.name,DB.user_table.field.id,id);
}

module.exports = {
   createUser,
   getAllUser,
   getUserById,
   deleteUser,
};