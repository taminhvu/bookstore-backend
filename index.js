require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieparser());
app.get('/', (req, res) => {
    res.send('home')
});
app.use(cors({origin:["http://localhost:3000"], credentials:true}));
app.use(helmet());
app.use('/auth',require('./src/routers/auth/authRouter')); 

const port = process.env.PORT || 3001;
app.listen(port,()=>console.log(`running at http://localhost:${port}`));