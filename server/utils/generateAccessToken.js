import jwt from 'jsonwebtoken'
import 'dotenv/config'

function generateAccessToken (userId) {
  return jwt.sign(userId, process.env.TOKEN_SECRET_KEY)
}

export default generateAccessToken
