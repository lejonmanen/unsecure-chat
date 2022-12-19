/*
import express, { Request, Response } from "express";
import {join, dirname} from 'path'
import {fileURLToPath}from 'url'
const __dirname:string = dirname(fileURLToPath(import.meta.url));
const staticPath:string = join(__dirname, '../../dist')

*/
import express from 'express'
import cors from 'cors';
import messageRoute from './messageRoute.js'

const app = express()
const PORT = process.env.PORT || 1337

app.use( cors({ origin: "*" }) )
app.use( express.json() )

app.use('/messages', messageRoute)



app.listen(PORT, () => {
	console.log(`Server listening to port ${PORT}...`)
})
