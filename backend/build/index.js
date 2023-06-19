"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var data_source_1 = require("./data-source");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = (0, express_1.default)();
var productController = require('./Controllers/product.controllers');
var PORT = 3000;
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.listen(PORT, function () { return console.log("Server started at port : ".concat(PORT)); });
data_source_1.AppDataSource.initialize().then(function () {
    console.log("Database connected successfully");
}).catch(function (error) { return console.log(error); });
app.use('/api', productController);
//# sourceMappingURL=index.js.map