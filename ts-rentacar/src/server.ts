import express from "express"
import { router } from "./routes"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger.json"
import { createConnection } from "./database/datasource"


createConnection()

const app = express()

app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)

app.listen(3333, () => console.log("Server is running on port 3333"))