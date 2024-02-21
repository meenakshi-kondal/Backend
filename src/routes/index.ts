import express from 'express';
import auth  from '../controller/auth';

const router = express.Router();


router.use('/auth', auth);
  
  export default router ;