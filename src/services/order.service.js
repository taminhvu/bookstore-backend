const {Order} = require('../models');
const DB_Define = require('../utils/DB_Define')
const order = new Order();


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
        return order.getOne(DB_Define.Order,"IDDonHang",ID);
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

const getOrder = async function(){
    try {
        return order.getAll(DB_Define.Order,"IDDonHang");
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
        const order = {IDNguoiDung:obj.IDNguoiDung,SoLuong:obj.SoLuong,TongTien:obj.TongTien,DiaChi:obj.DiaChi};
        const orderDetail = obj.ChiTietDonHang;
        const data = await createOrder(order);
        orderDetail.forEach(async element => {
            element["IDDonHang"] = data.insertId;
            await createOrderDetail(element);
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderByID,
    updateOrder,
    deleteOrderByID,
    getOrder,
    createOrderDetail,
    getOrderDetailByID,
    updateOrderDetail,
    deleteOrderDetailByID,
    getOrderDetail,
    addOrder,
}