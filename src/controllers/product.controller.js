const { productService } = require("../services");
const httpStatus = require("http-status");
const Response = require("../utils/Response");
const Uploader = require('../middlewares/Uploader');
const fs = require('fs');

const addProduct = async function (req, res) {
  try {
    var upload = Uploader.single("HinhAnh");
    upload(req,res,async function(err){
      if(err)return res.status(httpStatus.BAD_REQUEST).json(new Response(true,err.message));
      if (!req.file) {
          return res.status(httpStatus.BAD_REQUEST).json(new Response(true,'No file!'));
      } 
      let src = req.file.path.split('\\').join('/');
      let obj = req.body;
      obj["HinhAnh"] = src;
      console.log(obj);
      await productService.addProduct(obj);
      return res.status(httpStatus.CREATED).send(new Response(false, "create"));
    }); 
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const getNewProduct = async function (req, res) {
  try {
    const product = await productService.getNewProduct();
    return res.status(httpStatus.OK).json(new Response(false,"",product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getBestSeller = async function (req, res) {
  try {
    const product = await productService.getBestSeller();
    return res.status(httpStatus.OK).json(new Response(false,"",product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getTopTenBestsellerPerDay = async function (req, res) {
  try {
    const product = await productService.getTopTenBestsellerPerDay();
    return res.status(httpStatus.OK).json(new Response(false,"",product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
const getProductByID = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByID(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const getProductByIDDanhMuc = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByIDDanhMuc(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const getProductByIDTheLoai = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByIDTheLoai(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getProductByIDNhaXuatBan = async function (req, res) {
  try {
    const id = req.params.ID;
    const product = await productService.getProductByIDNhaXuatBan(id);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};

const getAllProduct = async function (req, res) {
  try {
    const product = await productService.getAllProduct();
    console.log(product);
    return res.status(httpStatus.OK).json(new Response(false, "", product));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

const deleteProductByID = async function(req,res){
  try {
    const ID = req.params.ID;
    await productService.deleteProductByID(ID);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const updateProductByID = async function(req,res){
  try {
    const ID = req.params.ID;
    const obj = req.body;
    await productService.updateProductByID(ID,obj);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
};
const getProductPagination = async function (req, res) {
  try {
    const page = req.query.p;
    const size = req.query.s;
    const data = await productService.getProductPagination(page,size);
    return res.status(httpStatus.OK).json(new Response(false, "", data));
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
module.exports = {
    addProduct,
    getNewProduct,
    getProductByID,
    getAllProduct,
    deleteProductByID,
    updateProductByID,
    getProductByIDDanhMuc,
    getProductByIDTheLoai,
    getProductByIDNhaXuatBan,
    getBestSeller,
    getTopTenBestsellerPerDay,
    getProductPagination,
}
