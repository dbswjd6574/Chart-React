import express from 'express';
import chart from './chart';
import dashboard from './dashBoard';

const router = express.Router();
router.use('/chart', chart);
router.use('/dash', dashboard);

export default router;