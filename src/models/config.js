const mysql = require('mysql');
require('dotenv').config;

const host = process.env.HOST;
const user = process.env.DATABASE_USER;
const pass = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

console.log(host, user, pass, database);

const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    password: pass,
    database: database
});
pool.getConnection((err,connection)=>{
    if(err){
        console.log(err);
       return err;
    }else{
        console.log("connection succeess");
    }
})
module.exports = pool;