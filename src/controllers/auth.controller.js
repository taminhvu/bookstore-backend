const { query } = require("express");
const httpStatus = require("http-status");
const Define = require('../utils/Define');
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const Response = require("../utils/Response");


const register = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res
      .status(httpStatus.CREATED)
      .json(new Response(false, "Create", { Email: req.body.Email }));
  } catch (error) {
    console.log(error);
    res.status(httpStatus.NOT_ACCEPTABLE).json(new Response(true,error.message));
  }
};

const login = async (req, res) => {
  try {
    const { Email, MatKhau } = req.body;
    const result = await authService.loginWithEmailAndPassword(Email, MatKhau);
    res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
    tokenService.addRefreshToken(result.refreshToken);
    const user = result.user;
    res.status(httpStatus.OK).json(new Response(false, "", {Email:user.Email,HoTen:user.HoTen ,Anh:process.env.URL+user.Anh,accessToken:user.accessToken}));
  } catch (error) {
    res.status(httpStatus.NOT_ACCEPTABLE).json(new Response(true,error.message));
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const Email = req.body.Email;
    const user = await userService.getUserByEmail(Email);
    const verifyEmailToken = tokenService.generateVerifyEmailToken(
      user[0].IDNguoiDung
    );
    await emailService.sendVerificationEmail(req.body.Email, verifyEmailToken);
    return res.status(httpStatus.OK).json(new Response(false, "success"));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.EXPECTATION_FAILED).json(new Response(true,'fail-to-send-email',{error}));
  }
};

const verifyEmailToken = async (req, res) => {
  try {
    const token = req.body.token;
    await authService.verifyEmail(token);
    return res.status(httpStatus.OK).json(new Response(false,'success'));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const updateToken = async (req,res)=>{
  try {
    const oldRefreshToken = req.signedCookies.refreshToken;
  console.log(oldRefreshToken);
  const result = await authService.updateToken(oldRefreshToken);
  res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
  return res.status(httpStatus.OK).json(new Response(false,'',{accessToken:result.accessToken}));
  } catch (error) {
    console.log(error)
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};
const logout = async (req,res)=>{
  try {
    const token = req.signedCookies.refreshToken;
    await authService.logout(token);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const sendEmailResetPassword = async(req,res)=>{
  try {
    const email = req.body.Email;
    await authService.sendEmailResetPassword(email);
    res.status(httpStatus.OK).json(new Response(false,"send email  success"));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};
const resetPassword = async(req,res)=>{
  try {
    const {resetPasswordToken,newPassword} = req.body;
    console.log(req.body)
    await authService.resetPassword(resetPasswordToken,newPassword);
    res.status(httpStatus.OK).json(new Response(false,"update password success"));
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const changePassword = async(req,res)=>{
  try {
    const {Email,oldPassword,newPassword} =  req.body;
    await authService.changePassword(Email,oldPassword,newPassword);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
}
module.exports = {
  login,
  register,
  sendVerificationEmail,
  verifyEmailToken,
  updateToken,
  logout,
  resetPassword,
  sendEmailResetPassword,
  changePassword,
};
