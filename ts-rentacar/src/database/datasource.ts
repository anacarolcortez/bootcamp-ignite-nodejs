import { DataSource } from "typeorm"
import { CreateCategories1669034032145 } from "./migrations/1669034032145-CreateCategories";
import { CreateSpecification1669049330370 } from "./migrations/1669049330370-CreateSpecification";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "tester",
    database: "db_rentacar",
    entities: ["./src/modules/**/entities/*.ts"],
    migrations: [
        CreateCategories1669034032145,
        CreateSpecification1669049330370
    ],
    subscribers: [],
})

export function createConnection(host = "db_rentacar"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  
export default AppDataSource