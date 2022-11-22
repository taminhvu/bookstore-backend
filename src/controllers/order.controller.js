const httpStatus = require("http-status");
const{orderService} =require("../services");
const Response = require('../utils/Response');
const addOrder = async function(req,res){
    try {
        const obj = req.body;
        // obj[IDNguoiDung] = req.user;
        await orderService.addOrder(obj);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getOrderByID(ID);
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAllOrder = async function(req,res){
    try {
        const data = await orderService.getAllOrder()
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderDetailByIDOrder = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getOrderDetailByIDOrder(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getRevanue = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getRevanue(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAmount = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getAmount(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAmountPerDay = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getAmountPerDay(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
module.exports={
    addOrder,
    getOrderByID,
    getAllOrder,
    getOrderDetailByIDOrder,
    getRevanue,
    getAmount,
    getAmountPerDay,
}