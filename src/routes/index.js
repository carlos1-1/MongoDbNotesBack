const express = require('express')
const router = express.Router()

const getAllUsers = require('./user/index.js')

router.use("/",getAllUsers)
  
module.exports=router