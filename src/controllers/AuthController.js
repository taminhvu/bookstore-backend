// const bcrypt = require('bcrypt');
// const AuthModel = require("../models/user.model");
// const Response = require("../models/Response");
// const DB_Define = require("../utils/DB_Define");
// const Define = require("../utils/Define");
// const Helper = require("../utils/Helper");

// const AuthController = {
//   signUp: (req, res) => {
//     try {
//       // console.log(req.body);
//       const { HoTen, Email, MatKhau, NgaySinh, GioiTinh } = req.body;
//       //validatioin
//       if (!HoTen || !Email || !MatKhau || !NgaySinh || !GioiTinh) {
//         return res.status(400).json("Enter enough info");
//       }
//       new AuthModel().getUserByEmail(DB_Define.USER_TABLE,Email,(err,results)=>{
//         if( err){
//            throw err;
//         }
//         else{
//           if( results.length > 0){
//             return res.status(400).json("Email is available");
//           }
//           else{
//             if (MatKhau.length < 6) {
//               return res.status(400).json("Password too short");
//             }
//             const hashpass =  bcrypt.hashSync(MatKhau,bcrypt.genSaltSync(10));
//             const user = {
//               Quyen: "1",
//               Email,
//               HoTen,
//               MatKhau: hashpass,
//               NgaySinh,
//               GioiTinh,
//             };
//             new AuthModel().addData(DB_Define.USER_TABLE, user, (err, results) => {
//               if (err) {
//                 let response = new Response(true, err.message, err);
//                 res.send(response);
//               } 
//               else {
//                 delete user.MatKhau;
//                 user["IDNguoiDung"] = results.insertId;
//                 return res
//                   .status(200)
//                   .json(new Response(false, "user created successfully", user));
//               }
//             }); //end db
//           }
//         }
//       });
//     } catch (e) {
//       let response = new Response(true, e.message, e);
//       res.send(response);
//     }
//   }, //end create user.

//   login: (req, res) => {
//     try {
//       const { Email, MatKhau } = req.body;
//       //validatioin
//       if (!Email || !MatKhau) {
//         return res.status(400).json("lack of email or password");
//       }
//       //check user is available or not in db
//       new AuthModel().getUserByEmail(
//         DB_Define.USER_TABLE,
//         Email,
//         (err, results) => {
//           try {
//             if (err) {
//               throw err;
//             } else {

//               if (results.length == 0) {
//                 return res.status(404).json("Email not found");
//               }
//               const user = results[0];
//               const ckPass = bcrypt.compareSync(MatKhau, user.MatKhau);
//               if(!ckPass){
//                  return  res.status(401).json("incorrect password");
//               }
//               //create access token
//               let payload = {email: user.Email, quyen: user.Quyen};
//               let accessToken = Helper.getAccesstoken(payload,10000);

//               //create refresh token
//               let refreshToken = Helper.getRefreshtoken(payload);

//               // res.cookie('refreshToken',refreshToken,Define.SESSION_COOKIE_OPTION);
//               const response = new Response(false,'accessToken',accessToken);
//               return res.status(200).json(response);
//             }
//           } catch (e) {
//             let response = new Response(true, e.message, e);
//             res.send(response);
//           }
//         }
//       ); //end db
//     } catch (e) {
//       let response = new Response(true, e.message, e);
//       res.send(response);
//     }
//   }, //login
//   logout: (req, res) => {
//     res.cookie(Define.TOKEN, "", Define.LOGOUT_COOKIE_OPTION);
//     res.status(200).json(new Response(false, "user logged out", {}));
//   },
//   isLoggedIn: (req, res,next) => {
//     let token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).send("Access Denied / Unauthorized request");
//     }
//     try {
//       token = token.split(' ')[1];
//       if(!token) return res.status(401).send('Unauthorized request');
//       let verifiedUser = Helper.verifyAccesstoken(token);
//       if (!verifiedUser) return res.status(401).send('Unauthorized request');
//       req.user = verifiedUser;
//       console.log(verifiedUser);
//       next();
//     } catch (error) {
//       return res.status(400).send("Invalid Token");
//     }
//   }, //isLoggedIn
//   refreshToken: async(req,res)=>{
//     let token = req.cookies.refreshToken;
//     if(!token) return res.status(401).json("Unauthorized request");
//     try{
//       let user = Helper.verifyRefreshtoken(token);
//       if(!user) return res.status(401).send('Unauthorized request');
//       let payload = {emai: user.email,quyen: user.quyen};
//       let accessToken = Helper.getAccesstoken(payload);
//       let refreshToken = Helper.getRefreshtoken(payload);
//       res.cookie('refreshToken',refreshToken,Define.SESSION_COOKIE_OPTION);
//       const response = new Response(false,'accessToken',accessToken);
//       return res.status(200).header('auth-token',accessToken).json(response);
//     }catch(err){
//       return res.status(400).send("Invalid Token");
//     }
//   },
//   isUser:async (req,res,next)=>{
//     if(req.user.quyen == 1){
//       console.log('user');
//       next();
//     }
//     return res.status(401).send("Unauthorized!");
    
//   },
//   isAdmin:async (req,res,next)=>{
//     if(req.user.quyen == 0){
//       console.log('admin')
//       next();
//     }
//     return res.status(401).send("Unauthorized");
//   }
// };


// module.exports = AuthController;

