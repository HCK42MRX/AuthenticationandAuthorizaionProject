import { loginController } from '../controllers/authenticationsController.js'
import express from 'express'

// import middleware

const router = express.Router()

router.post('/', loginController)

export { router as loginRouters }
