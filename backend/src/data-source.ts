import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-ci898118g3n3vm49uo00-a",
    port: 5432,
    username: "admin",
    password: "5gIrQhZaABqM5lMOhAtxgkz9r4DoMbhh",
    database: "type_orm",
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
})
