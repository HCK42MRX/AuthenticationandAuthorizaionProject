import express from 'express'

// import controller
import { registerController } from '../controllers/authenticationsController.js'

// import middleware

const router = express.Router()

router.post('/', registerController)

export { router as registerRouters }
