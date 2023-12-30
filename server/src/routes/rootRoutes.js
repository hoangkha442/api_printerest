import express from 'express'
import userRoute from './userRoutes.js'
import pictureRoute from './pictureRoutes.js'
import authRoute from './authRoutes.js'

const rootRoute = express.Router()

rootRoute.use('/user', userRoute)
rootRoute.use('/picture', pictureRoute)
rootRoute.use('/auth', authRoute)
export default rootRoute