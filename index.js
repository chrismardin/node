import express from "express"

import bancosV1 from "./routes/v1/bancosV1.js"
import bancosV2 from "./routes/v2/bancosV2.js"

const app = express()

app.use(express.json())

app.use("/api/v1", bancosV1)
app.use("/api/v2", bancosV2)

app.listen(3000, ()=>{
 console.log("Servidor en http://localhost:3000")
})