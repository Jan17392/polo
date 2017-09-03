import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { store } from './store'

export const server = express()
server.use(bodyParser.json())
server.use(cors())
const router = Router()
server.use('/', router)

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log('Listening on %s', port)
})

router.get('/store_reader', (req, res, next) => {
  res.json({ result: store.getState() })
})

