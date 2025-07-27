const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
require('./db.js')
const productRoute = require('./routes/productRoute.js')
const orderRoute = require('./routes/orderRoutes.js')
const PORT = process.env.PORT;
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Running at proj E-com');
});

app.use('/product',productRoute)
app.use('/order',orderRoute)

app.listen(PORT,()=>{
  console.log('Application running at port:',PORT);
  
});