import { PrismaClient } from '@prisma/client'

// * import validator module
import isEmail from 'validator/lib/isEmail.js'

// * import utils
import generateAccessToken from '../utils/generateAccessToken.js'

const prisma = new PrismaClient()

const registerController = async (req, res) => {
  // TODO: check apakah user sudah melakukan authentikasi, jika sudah user tidak diperbolehkan untuk melakukan authentikasi kembali!
  if (req.cookies.accessToken) {
    return res.status(200).send('anda sudah melakukan authentikasi')
  }
  try {
    const { username, email, password } = req.body

    // TODO: validasi data dengan regex, apakah inputan username terdapat minimal 8 huruf, dan terdapat satu huruf besar dan kecil dan juga terdapat angka?
    const isUsername = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
      username
    )
    // TODO: jika tidak maka kembalikan error agar user harus menginputkan username sesuai dengan format username yang benar
    if (!isUsername) {
      return res
        .status(400)
        .send('username berisi 8 huruf, satu huruf besar dan beberapa angka')
    }
    // TODO: jika lolos, cari dan periksa apakah username yang diketikan user sudah ada?
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username
      }
    })
    // TODO: jika sudah ada maka kembalikan "username sudah ada" dan berhenti
    if (isUsernameExist) {
      return res.status(400).send('username sudah ada')
    }

    // TODO: jika lolos, cek apakah inputan email dari user sudah benar disini saaya menggunakan library {validator.js}, jika tidak maka kembalikan "email tidak valid"
    if (!isEmail(email)) {
      return res.status(400).send('email tidak valid')
    }

    // TODO: jika lolos, periksa inputan password dengan regex, apakah mengandung 8 huruf?
    const isPassword = /^.{8,}$/.test(password)
    // TODO: jika tidak maka kembalikan pesan error "password harus minimal 8 huruf", dan user harus memperbaikinya terlebih dahulu
    if (!isPassword) {
      return res.status(400).send('password harus minimal 8 huruf')
    }

    // INFO: VALIDASI DATA SELESAI :) //

    // TODO: masukan semua inputan user {username,email,password} ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })

    // TODO: jika berhasil dimasukan ke database kembalikan pesan berhasil
    if (newUser) {
      // TODO: lalu generate dan kirim token ke sisi client
      const token = generateAccessToken(newUser.id)
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === 'production',
        maxAgeO: 24 * 60 * 60 //* expired dalam 24 jam
      })
      return res.status(200).send(`${newUser.username} berhasil ditambahkan!`)
    }
  } catch (error) {
    // TODO: jika muncul error 'kesalahan server' maka kesalahan ada terdapat di database atau server belum dihidupkan
    return res.status(500).send('kesalahan server')
  }
}

const loginController = async (req, res) => {
  // TODO: check apakah user sudah melakukan authentikasi, jika sudah user tidak diperbolehkan untuk melakukan authentikasi kembali!
  if (req.cookies.accessToken) {
    return res.status(200).send('anda sudah melakukan authentikasi')
  }
  try {
    const { username, password } = req.body
    // TODO: mencari username yang sesuai dengan yang diinput user
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    // TODO: apakah user yang diinputkan user ada, jika tidak ada kembalikan user tidak ditemukan, dan proses login dihentikan
    if (!user) {
      return res.status(404).send('user tidak ditemukan')
    }
    // TODO: jika ada, maka periksa password apakah cocok dengan yang ada pada database
    const isPasswordMatch = password === user.password
    // TODO: jika tidak cocok, kembalikan password salah
    if (!isPasswordMatch) {
      return res.status(401).send('password salah')
    }

    // TODO: jika semua tahapan verifikasi berhasil maka generate dan kirim token ke sisi client
    const token = generateAccessToken(user.id)
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'production',
      maxAge: 24 * 60 * 60 //* expired dalam 24 jam
    })
    // TODO: kirim pesan berhasil
    return res.status(200).send(`${user.username} berhasil login`)
  } catch (error) {
    // INFO: jika muncul error 'kesalahan server' maka kesalahan ada terdapat di database atau server belum dihidupkan
    return res.status(500).send('kesalahan server')
  }
}

export { registerController, loginController }
