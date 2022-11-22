const {Order} = require('../models');
const product = require('./product.service');
const DB_Define = require('../utils/DB_Define')
const order = new Order();
const moment = require('moment');

//crud order
const createOrder = async function(obj){
    try {
        return order.addData(DB_Define.Order,obj);
    } catch (error) {
        throw error;
    }
}

const getOrderByID = async function(ID){
    try {
        return order.getOrderByID(ID);
    } catch (error) {
        throw error;
    }
}

const updateOrder = async function(obj,ID){
    try {
        return order.updateData(DB_Define.Order,"IDDonHang",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteOrderByID = async function(ID){
    try {
        return order.deleteData(DB_Define.Order,"IDDonHang",ID);
    } catch (error) {
        throw error;
    }
}

const getAllOrder = async function(){
    try {
        return order.getAllOrder()
    } catch (error) {
        throw error;
    }
}
const getOrderDetailByIDOrder = async function(ID){
    try {
        return order.getOrderDetailByIDOrder(ID)
    } catch (error) {
        throw error;
    }
}

const createOrderDetail = async function(obj){
    try {
        return order.addData(DB_Define.orderDetail,obj);
    } catch (error) {
        throw error;
    }
}

const getOrderDetailByID = async function(ID){
    try {
        return order.getOne(DB_Define.orderDetail,"IDChiTietDonHang",ID);
    } catch (error) {
        throw error;
    }
}

const updateOrderDetail = async function(obj,ID){
    try {
        return order.updateData(DB_Define.orderDetail,"IDChiTietDonHang",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteOrderDetailByID = async function(ID){
    try {
        return order.deleteData(DB_Define.orderDetail,"IDChiTietDonHang",ID);
    } catch (error) {
        throw error;
    }
}

const getOrderDetail = async function(){
    try {
        return order.getAll(DB_Define.Order,"IDChiTietDonHang");
    } catch (error) {
        throw error;
    }
}

const addOrder = async function(obj){
    try {
        const order = {IDNguoiDung:obj.IDNguoiDung,DiaChi:obj.DiaChi};
        const orderDetail = obj.ChiTietDonHang;
        //kiem tra chi tiet don hang
        let error = false;
        for await(const element of orderDetail){
            console.log(element);
            const id = element["IDSanPham"];
            const sanpham = await product.getProductByID(id);
            if(sanpham[0].SoLuongConLai < element["SoLuong"])error = true; 
        }
        console.log(error);
        if(error === true) throw new Error(`product exceeds quantity`);
        const data = await createOrder(order);
        orderDetail.forEach(async element => {
            element["IDDonHang"] = data.insertId;
            const id = element["IDSanPham"];
            const sanpham = await product.getProductByID(id);
            const soluong = sanpham[0].SoLuongConLai - element["SoLuong"];
            await product.updateProductByID(id,{SoLuongConLai:soluong});
            await createOrderDetail(element);
        });
    } catch (error) {
        throw error;
    }
}

const getRevanue = async function(){
    try {
        let date = moment().isoWeekday(1).format("YYYY-MM-DD");
        const data = await order.getRevanue(date);
        const percent = (data[0].DoanhThu /data[1].DoanhThu * 100)-100;
        return {DoanhThu:data[0].DoanhThu,PhanTram:percent};
    } catch (error) {
        throw error;
    }
}
const getAmount = async function(){
    try {
        let date = moment().isoWeekday(1).format("YYYY-MM-DD");
        const data = await order.getAmount(date);
        const percent = (data[0].TongDon /data[1].TongDon * 100)-100;
        return {TongDon:data[0].TongDon,PhanTram:percent};
    } catch (error) {
        throw error;
    }
}
const getAmountPerDay = async function(){
    try {
        let date = moment().isoWeekday(1).format("YYYY-MM-DD");
        const data = await order.getAmountPerDay(date);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderByID,
    updateOrder,
    deleteOrderByID,
    getAllOrder,
    createOrderDetail,
    getOrderDetailByID,
    updateOrderDetail,
    deleteOrderDetailByID,
    getOrderDetail,
    addOrder,
    getOrderDetailByIDOrder,
    getRevanue,
    getAmount,
    getAmountPerDay,
}