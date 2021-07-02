const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')
const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')
const {handleError,convertToApiError} = require('./middleware/apiError');



const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
//body parser
app.use(express.json())

//checking if everything is clean
app.use(xss());
app.use(mongoSanitize());

//passport

app.use(passport.initialize());
passport.use('jwt',jwtStrategy);



//routes

app.use('/api',routes);

//HANDLE ERROR
app.use(convertToApiError);
app.use((err,req,res,next)=>{
    handleError(err,res)
    })
const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})