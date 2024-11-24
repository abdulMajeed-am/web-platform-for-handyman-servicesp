const express = require('express')
const router = express.Router()
const {Login,UserRegistered,UserDetails,EmailEnter,OTPEnter,RessetPassword} = require('../controller/user-register')
const {AddBooking,GetUserBooking} = require('../controller/booking')
const {AddPayment,GetUserPayment} = require('../controller/payment')
const {AddReview,GetReview,GetAllReview} = require('../controller/review')
const User = require('../middleware/Admin')

//Auth
router.post('/register',UserRegistered)
router.post('/login',Login)
router.post('/emailEnter',EmailEnter)
router.post('/otpEnter',OTPEnter)
router.post('/ressetPassword',RessetPassword)
router.get('/UserDetails',UserDetails)

//booking
router.post('/booking',User,AddBooking)
router.get('/view-booking',User,GetUserBooking)

//payment
router.post('/payment',User,AddPayment)
router.get('/view-payment',User,GetUserPayment)
//AddReview
router.post('/review',User,AddReview)
router.get('/get-review/:id',GetReview)
router.get('/GetAllReview',GetAllReview)

module.exports=router