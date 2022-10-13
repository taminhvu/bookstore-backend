const httpStatus = require('http-status');
const {User} = require('../models');
const Response = require('../utils/Response');
const DB = require('../utils/DB_Define');
const bcrypt = require('bcrypt');
const user = new User();

const createUser = async(userBody)=>{
   const {Email,HoTen,MatKhau,GioiTinh} = userBody;
   const check = await user.getUserByEmail(DB.user_table.name,Email);
   if(check.length !=0){ 
     throw new  Response(true,'Email already use');
   } 
   const hashpass =  bcrypt.hashSync(MatKhau,bcrypt.genSaltSync(10));
   const obj = {
      Quyen:'1',
      Email,
      HoTen,
      MatKhau: hashpass,
      GioiTinh,
   };
   return user.addData(DB.user_table.name,obj);
}


const getUserByEmail = async(Email)=>{
   return user.getUserByEmail(DB.user_table.name,Email);
}
const getAllUser = async ()=>{
   return user.getAll(DB.user_table.name);
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
   getUserByEmail,
   getUserById,
   deleteUser,
};