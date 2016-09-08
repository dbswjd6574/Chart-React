import express from 'express';
import chart from './chart';

const router = express.Router();
router.use('/chart', chart);

export default router;