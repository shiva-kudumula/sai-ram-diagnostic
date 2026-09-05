import {Router} from 'express';import {getTest,getTests} from '../controllers/testController.js';const r=Router();r.get('/',getTests);r.get('/:id',getTest);export default r;
