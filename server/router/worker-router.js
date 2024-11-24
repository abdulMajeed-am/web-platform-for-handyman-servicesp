const express = require('express')
const router = express.Router()
const {Login,WorkerRegistered,WorkerDetails,EmailEnter,OTPEnter,RessetPassword} = require('../controller/worker-register')
const {AddService,GetService,DeleteService,SingleService,UpdateService,GetWorkerService,GetWorkerAllService}=require('../controller/service')
const {GetBooking,SingleBooking,BookingStatus,GetBookingDate}=require('../controller/booking')
const {GetPayment}=require('../controller/payment')
const Worker = require('../middleware/Admin')
const {GetWrokerReview} = require('../controller/review')

const multer = require('multer')

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/worker-profile')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,  uniqueSuffix+ '-' + file.originalname)
    }
  })
  
  const upload1 = multer({ storage: storage1 })
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/service')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,  uniqueSuffix+ '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
//Auth
router.post('/register',upload1.fields([{ name: 'profile', maxCount: 1 }, { name: 'cv', maxCount: 1 }]),WorkerRegistered)
router.post('/login',Login)
router.post('/emailEnter',EmailEnter)
router.post('/otpEnter',OTPEnter)
router.post('/ressetPassword',RessetPassword)
router.get('/WorkerDetails',Worker,WorkerDetails)


//Service
router.post('/insert-service',Worker,upload.single('service_image'),AddService)
router.get('/view-service',Worker,GetService)
router.get('/view-all-service',Worker,GetWorkerAllService)
router.get('/view-worker-service/:id',GetWorkerService)
router.get('/single-service/:id',SingleService)
router.put('/update-servcie/:id',upload.single('service_image'),UpdateService)
router.delete('/delete-service/:id',DeleteService)
//booking
router.get('/view-booking',Worker,GetBooking)
router.get('/single-booking/:id',SingleBooking)
router.put('/booking-status/:id',BookingStatus)
router.get('/booking-date',Worker,GetBookingDate)
//payment
router.get('/view-payment',Worker,GetPayment)
//review
router.get('/get-review',Worker,GetWrokerReview)

module.exports=router