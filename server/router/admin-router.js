const express = require('express')
const router = express.Router()
const {category,viewcategory,updateCategory,deleteCategory}=require('../controller/category')
const {AllWorker,WorkerStatus,AllWorkerDate}=require('../controller/worker-register')
const Login = require('../controller/adminlogin')
const {GetAllPayment} = require('../controller/payment')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/category')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,  uniqueSuffix+ '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
//Auth
router.post('/login',Login)
//Category


router.post('/insert-category',upload.single('category_image'),category)
router.get('/view-category',viewcategory)
router.put('/update-category/:id',upload.single('category_image'),updateCategory)
router.delete('/delete-category/:id',deleteCategory)

//worker
router.get('/AllWorker',AllWorker)
router.get('/AllWorkerDate',AllWorkerDate)
router.put('/UpdateStatus/:id',WorkerStatus)
//payment
router.get('/view-payment',GetAllPayment)

module.exports=router