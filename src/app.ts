// const express = require('express')
import express, { Application, Request, Response } from 'express';
const app : Application = express()
import cors from 'cors';
import router from './app/routes';
const port = 3000

//parser
app.use(express.json());
app.use(cors())

app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;