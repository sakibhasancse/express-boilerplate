import express from 'express';
import { handleValidation, isAuth} from '../../common/middlewares';
import { userRegister, userLogin, userProfile } from './user-controller';
import user from './user-model';


const userRouter = express.Router();

userRouter
  .route('/signup')
  .post(handleValidation(user), userRegister)

userRouter
  .route('/login')
  // .post(handleValidation (login), userLogin)
  .post(userLogin)

userRouter
  .route('/profile')
  .get(isAuth, userProfile)


const router = async (app) => {
  app.use("/api/user", userRouter);
  return app;
};
module.exports = { router };
