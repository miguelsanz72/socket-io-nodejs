
import { Router, Request, Response } from 'express';
import { indexController } from '../controllers/index.controller'
const index = Router();

index.get('/index', indexController.index);

export default index;


