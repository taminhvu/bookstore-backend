require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const helmet = require('helmet');
const routers = require('./routers');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieparser());
app.get('/', (req, res) => {
    res.send(req.query.id);
});
app.use(cors({origin:["http://localhost:3000"], credentials:true}));
app.use(helmet());
app.use('/api',routers);
const port = process.env.PORT || 3001;
app.listen(port,()=>console.log(`running at http://localhost:${port}`));