import express from 'express';
import { AppDataSource } from "./data-source";
import { Product } from "./entity/Product";
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var productController = require('./Controllers/product.controllers');
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));


app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));

AppDataSource.initialize().then( () => {console.log("Database connected successfully")
}).catch(error => console.log(error))

 app.use('/api', productController);
