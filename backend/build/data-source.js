"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Product_1 = require("./entity/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin123",
    database: "type_orm",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map