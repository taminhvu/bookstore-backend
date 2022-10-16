const hepler = require('../src/utils/Helper');
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({path:__dirname +'./../.env'});

// const token = hepler.getAccesstoken({IDNguoiDung:'22'},'10h');
// console.log(token);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRE5ndW9pRHVuZyI6IjIyIiwiaWF0IjoxNjY1ODUwOTUzLCJleHAiOjE2NjU4ODY5NTN9.jzgIzlpJStY6wgER83wbQdCy965b62u8SkDlV04t_ck';
const user = hepler.verifyAccesstoken(token);
console.log(user);