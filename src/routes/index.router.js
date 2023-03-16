const express = require('express')
const indexController = require('../controllers/index.controller')
const router = express.Router()


// router.get('/pickseat/:id', indexController.pickseat)

// router.get('/picktime/:id', indexController.picktime)

router.get('/changepwd', indexController.changpwd) //trang đổi mật khẩu

router.post('/changepwd', indexController.postChangepwd) //nhận value để đổi mật khẩu

router.get('/search/:id', indexController.search) //trang tìm kiếm

router.get('/editFilm', indexController.editFilm) //trang sửa phim

router.post('/editFilm', indexController.postEditFilm) //nhận value để lấy thông tin phim cần sửa

router.post('/editFilm2', indexController.postEditFilm2) //nhận value để thay đổi thông tin phim cần sửa

router.get('/delFilm', indexController.delFilm) //trang xóa phim

router.post('/delFilm', indexController.postDelFilm) //nhận value để xóa phim

router.get('/addFilm', indexController.addFilm) //trang thêm phim

router.post('/addFilm', indexController.postAddlFilm) //nhận value để thêm phim

router.get('/accountDetail', indexController.accountDetail) //trang thông tin tài khoản

router.post('/accountDetail', indexController.postAccountDetail) //nhận value để thay đổi thông tin cá nhân

router.get('/showing', indexController.showing) //trang phim đang chiếu

router.get('/coming', indexController.coming) //trang phim sắp chiếu

router.get('/nav', indexController.nav) //trang sử dụng lại 1 phần code navbar

router.get('/PPDfunctions', indexController.PPDfunctions) //trang sử dụng lại 1 phần code chức năng cho admin

router.get('/logout', indexController.logout) //trang đăng xuất

router.get('/', indexController.home) //trang chủ

router.post('/login', indexController.postLogin)//nhận value để kiếm tra đăng nhập

router.get('/login', indexController.login) //trang đăng nhập

router.post('/register', indexController.postRegister) //nhận value để đăng kí tài khoản

router.get('/register', indexController.register) //trang đăng kí

router.get('/:id', indexController.filmDetail) //trang chi tiết phim



module.exports = router