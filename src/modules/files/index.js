import {
  uploadNewFile,
  getListFiles,
} from './files-controller'
import express from 'express'
import { isAuth } from '../../common/middlewares'
const filesRouter = express.Router()

filesRouter
  .route('/files')
  .post(isAuth, uploadNewFile)
  .get(isAuth, getListFiles)

//Another router

const router = async (app) => {
  app.use('/api', filesRouter)
  return app
}
module.exports = { router }
