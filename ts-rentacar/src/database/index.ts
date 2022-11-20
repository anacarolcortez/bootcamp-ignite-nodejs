import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "db_rentacar",
    port: 5432,
    username: "docker",
    password: "tester",
    database: "db_rentacar",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })