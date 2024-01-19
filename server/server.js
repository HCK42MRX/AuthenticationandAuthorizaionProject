import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// import routers
import { registerRouters } from './routers/registerRouters.js'
import { loginRouters } from './routers/loginRouters.js'

const server = express()
const PORT = 3000

// use cookie parsing
server.use(cookieParser())

// use cors configurations
server.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

// use body parsing for form
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// setup route by use routers (path, routerFile)
server.use('/api/user/register', registerRouters)
server.use('/api/user/login', loginRouters)

server.get('/', (req, res) => {
  const token = req.cookies
  return res.json({ token })
})

server.listen(PORT, () => {
  console.log(`server was running: http://localhost:${PORT}`)
})
