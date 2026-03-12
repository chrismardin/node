import express from "express"
import fs from "fs"

const router = express.Router()

const data = fs.readFileSync("lista.json", "utf8")
const bancos = JSON.parse(data) 
    



router.get("/", (req, res) => {
 res.send("Bienvenido al servidor de bancos V1")
})


router.get("/bancos", (req, res) => {
 res.json(bancos)
})


router.get("/bancos/:id", (req, res) => {

 const id = Number(req.params.id)

 const banco = bancos.bancos.find(b => b.id === id)

 if (banco) {
  res.json(banco)
 } else {
  res.send("Banco no encontrado")
 }

})


router.get("/bancos/:id/personas", (req, res) => {

 const banco = bancos.bancos.find(b => b.id == req.params.id)

 if (!banco) {
  return res.send("Banco no encontrado")
 }

 res.json(banco.personas)

})


router.get("/bancos/:id/personas/:idPersona", (req, res) => {

 const id = Number(req.params.id)
 const idPersona = Number(req.params.idPersona)

 const banco = bancos.bancos.find(b => b.id === id)

 if (!banco) {
  return res.send("Banco no encontrado")
 }

 const persona = banco.personas.find(p => p.id === idPersona)

 if (persona) {
  res.json(persona)
 } else {
  res.send("Persona no encontrada")
 }

})


router.post("/bancos", (req, res) => {

 const nuevoBanco = req.body

 bancos.bancos.push(nuevoBanco)

 fs.writeFileSync("lista.json", JSON.stringify(bancos, null, 2))

 res.json({ mensaje: "Banco agregado", banco: nuevoBanco })

})


router.post("/bancos/:id/personas", (req, res) => {

 const banco = bancos.bancos.find(b => b.id == req.params.id)

 if (!banco) {
  return res.send("Banco no encontrado")
 }

 banco.personas.push(req.body)

 fs.writeFileSync("lista.json", JSON.stringify(bancos, null, 2))

 res.json(req.body)

})


router.put("/bancos/:id/personas/:idPersona", (req, res) => {

 const id = Number(req.params.id)
 const idPersona = Number(req.params.idPersona)

 const banco = bancos.bancos.find(b => b.id === id)

 if (!banco) {
  return res.send("Banco no encontrado")
 }

 const persona = banco.personas.find(p => p.id === idPersona)

 if (!persona) {
  return res.send("Persona no encontrada")
 }

 persona.nombre = req.body.nombre || persona.nombre
 persona.cargo = req.body.cargo || persona.cargo
 persona.email = req.body.email || persona.email

 fs.writeFileSync("lista.json", JSON.stringify(bancos, null, 2))

 res.json({ mensaje: "Persona actualizada", persona })

})


router.delete("/bancos/:id/personas/:idPersona", (req, res) => {

 const id = Number(req.params.id)
 const idPersona = Number(req.params.idPersona)

 const banco = bancos.bancos.find(b => b.id === id)

 if (!banco) {
  return res.send("Banco no encontrado")
 }

 const index = banco.personas.findIndex(p => p.id === idPersona)

 if (index === -1) {
  return res.send("Persona no encontrada")
 }

 banco.personas.splice(index, 1)

 fs.writeFileSync("lista.json", JSON.stringify(bancos, null, 2))

 res.json({ mensaje: "Persona eliminada" })

})



export default router
