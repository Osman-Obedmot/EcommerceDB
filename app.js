const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const orderItemRouter = require('./routes/orderItemRouter');

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the OSMAN Shopping Centre');
});

app.use((req, res, next)=>{

    //console.log(req.headers)

    if(req.url === "/api/v1/users/auth/login" || req.url === "/api/v1/users/auth/signup"){
        return next();
    }

    let headers = req.headers

    if(headers.authorization){
        let authHeader = headers.authorization;

        if(authHeader.startsWith('Bearer')){
            let token = authHeader.split(" ")[1]

            // verify
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                if(err){
                    res.send('Token seems invalid');
                }else{
                    req.user = decoded;  // store decoded user info (including role)
                    next();
                }
            })
        }
        else{
            res.send('Auth header is malformed')
        }

    }else{
        res.send("Missing Auth Header")
    }
})

app.use('/api/v1/users', usersRouter);

app.use('/api/v1/products', productRouter);

app.use('/api/v1/orders', orderRouter);

//app.use('/api/v1/orders', orderItemRouter);

module.exports = app;