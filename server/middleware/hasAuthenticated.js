import jwt from 'jsonwebtoken'
import 'dotenv/config'

// INFO: Fungsi ini digunakan untuk melakukan check pada sisi user apakah user sudah melakukan authentifikasi atau belum, jika belum maka dia tidak diperbolehkan untuk merequest API yang dimintanya,jika token tidak valid atau kadaluarsa dia tidak diperbolehkan untuk merequest API yang dimintanya dan Cookienya akan DIHAPUS, namun jika semuanya valid dia boleh merequest API yang dia minta dan akan dikirimkan dari server ke client

// ! Harap diingat pada middleware ini hanya melakukan check pada sisi server(mengecek token), jadi jika user belum login, user masih dapat mengakses halaman yang dituju, hanya saja dia tidak bisa meminta resource dari API server ini, jadi harap melakukan check juga pada sisi client agar client tidak bisa masuk ke halaman yang dia mau. Jika dia belum login

const hasAuthenticated = (req, res, next) => {
  try {
    // TODO: mendapatkan cookie dari sisi client
    const token = req.cookies.accessToken

    // TODO: apabila belum login dan tidak ada cookie user tidak boleh melanjutkan ke tahap selanjutnya
    if (!token) {
      res.status(403).send('anda belum melakukan authentikasi')
    }

    // TODO: memverifikasi token apabila benar maka akan boleh lanjut ke tahap berikutnya
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    req.user = verifyToken
    return next()
  } catch (error) {
    // TODO:  apabila cookie kadaluarsa atau token tidak valid akan mengembalikan pesan error dan cookienya akan DIHAPUS
    res.cookie('accessToken', 'broken', {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === 'production',
      maxAge: 1
    })
    return res
      .status(403)
      .send(
        'token tidak valid mungkin karna token kadaluarsa, atau token tidak sesuai'
      )
  }
}

export default hasAuthenticated
