const bcrypt = require('bcrypt');
const AuthModel = require("../../models/auth/AuthModel");
const Response = require("../../models/Response");
const DB_Define = require("../../utils/DB_Define");
const Define = require("../../utils/Define");
const Helper = require("../../utils/Helper");

const AuthController = {
  signUp:  (req, res) => {
    try {
      console.log(req.body);
      const { HoTen, Email, MatKhau, NgaySinh, GioiTinh } = req.body;
      //validatioin
      if (!HoTen || !Email || !MatKhau || !NgaySinh || !GioiTinh) {
        throw new Error("Enter enough info");
      }
      if (MatKhau.length < 6) {
        throw new Error("pass length should be atleast 6 char.");
      }
      //get hash pass & save new user into db
      const hashpass =  bcrypt.hashSync(MatKhau,bcrypt.genSaltSync(10));

      const user = {
        Quyen: "1",
        Email,
        HoTen,
        MatKhau: hashpass,
        NgaySinh,
        GioiTinh,
      };
      new AuthModel().addData(DB_Define.USER_TABLE, user, (err, results) => {
        if (err) {
          let response = new Response(true, err.message, err);
          res.send(response);
        } else {
          //get token and set into cookie
          const token = Helper.getJWTtoken(Email);
          //send token in http cookie with no expire
          res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION);
          delete user.MatKhau;
          user["IDNguoiDung"] = results.insertId;
          user["token"] = token;
          res
            .status(200)
            .json(new Response(false, "user created successfully", user));
        }
      }); //end db
    } catch (e) {
      let response = new Response(true, e.message, e);
      res.send(response);
    }
  }, //end create user.
  login: (req, res) => {
    try {
      const { Email, MatKhau } = req.body;
      console.log(req.body);
      //validatioin
      if (!Email || !MatKhau) {
        throw new Error("Enter email,password");
      }
      //check user is available or not in db
      new AuthModel().getUserByEmail(
        DB_Define.USER_TABLE,
        Email,
        (err, results) => {
          try {
            if (err) {
              throw err;
            } else {
              if (results.length == 0) {
                throw new Error("no user found with this email");
              }
              const user = results[0];
              console.log(user.MatKhau + " " + MatKhau);
              const ckPass = bcrypt.compareSync(MatKhau, user.MatKhau);
              console.log(ckPass);
            }
          } catch (e) {
            let response = new Response(true, e.message, e);
            res.send(response);
          }
        }
      ); //end db
    } catch (e) {
      let response = new Response(true, e.message, e);
      res.send(response);
    }
  }, //login
  // logout: (req, res) => {
  //   res.cookie(Define.TOKEN, "", Define.LOGOUT_COOKIE_OPTION);
  //   res.status(200).json(new Response(false, "user logged out", {}));
  // }, //logout
  // isLoggedIn: (req, res) => {
  //   try {
  //     const token = req.cookies.token;
  //     if (!token) {
  //       throw new Error("Unauthorized Access");
  //     }
  //     //token validation
  //     Helper.verifyJWTtoken(token);
  //     res.send(true); // logged in
  //   } catch (e) {
  //     //remove the old/expire token
  //     res.cookie("token", "", Define.LOGOUT_COOKIE_OPTION);
  //     res.send(false); //not logged in
  //   }
  // }, //isLoggedIn
};
module.exports = AuthController;
