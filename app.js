require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');


//express
const express=require('express');
const  app = express();
const body_parser=require('body-parser')
const cookie_parser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const rateLimiter=require('express-rate-limit')
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const mongoSanitize=require('express-mongo-sanitize')


app.set('trust proxy',1)
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:60
}))
app.use(xss())
app.use(mongoSanitize())
app.use(helmet())
app.use(cors());

//middleware
app.use(cookie_parser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(body_parser.json())
app.use(express.json())


app.use(express.static('./public'))
app.use(fileUpload());

//database
const connectDB=require('./db/connect');

app.get('/',(req,res)=>{
    res.send("Hello World!");
})
app.get('/api/v1',(req,res)=>{ 
    res.send("Hello World!");
    console.log(req.signedCookies);
})

//routers
const authRouter=require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter=require('./routes/productRouter')
const reviewRouter=require('./routes/reviewRoutes')
const orderRouter=require('./routes/orderRoutes')
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter) 
app.use('/api/v1/products',productRouter )
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)


const port=process.env.PORT||5000;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log('listening to port number : '+String(port)+' ...'))
    } catch (error) {
        console.log(error);
    }
}

start()