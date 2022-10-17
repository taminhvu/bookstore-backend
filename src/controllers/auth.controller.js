const { query } = require("express");
const httpStatus = require("http-status");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const Response = require("../utils/Response");
const register = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res
      .status(httpStatus.CREATED)
      .json(new Response(false, "Create", { Email: req.body.Email }));
  } catch (err) {
    console.log(err);
    res.status(httpStatus.NOT_ACCEPTABLE).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { Email, MatKhau } = req.body;
    const user = await authService.loginWithEmailAndPassword(Email, MatKhau);
    const token = tokenService.generateAuthToken(user);
    user["accesstoken"] = token;
    res.status(httpStatus.OK).json(new Response(false, "", user));
  } catch (err) {
    console.log(err);
    res.status(httpStatus.NOT_ACCEPTABLE).json(err);
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
    return res.status(httpStatus.EXPECTATION_FAILED).json(new Response(true,'',{error}));
  }
};

const verifyEmailToken = async (req, res) => {
  try {
    const token = req.body.token;
    await authService.verifyEmailToken(token);
    return res.status(httpStatus.OK).json();
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
};
module.exports = {
  login,
  register,
  sendVerificationEmail,
  verifyEmailToken,
};
