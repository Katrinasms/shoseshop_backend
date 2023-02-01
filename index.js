import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./Datalmport.js";
import productRoute from "./Routes/ProductRoutes.js"
import { errorHandler, notFound } from "./Middleware/Error.js";
import cors from 'cors';
import userRoute from "./Routes/UserRoutes.js"
import orderRouter from "./Routes/OrderRoutes.js"

dotenv.config();
connectDatabase();
const app = express()
const port = 5001
app.use(cors({ origin: "*" }))
app.use(express.json());

// var whitelist = ['*']
// var corsOptions = {
//     credentials: true,
//     origin: function(origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }
  
// app.use(cors(corsOptions));

// // put data to the server
app.get('/', (req, res) => {
    res.send('Hello World!')
  })





// app.get('/api/products', (req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.json(products);
// })

// //put single product to the server
// app.get('/api/products/:id', (req, res)=> {
//     // Website you wish to allow to connect
//     res.header("Access-Control-Allow-Origin", "*");

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
   
//     const product = products.find((p) => p._id === req.params.id);
    
//     res.json(product);
// })


//API
app.use("/api/products",productRoute);
app.use("/api/import",ImportData);
app.use("/api/users",userRoute);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res)=>{
  res.send(process.env.PORT)
});



//userRoute

//Errpr Handler
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

