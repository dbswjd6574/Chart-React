import express from 'express';
import chart from './chart';
import dashboard from './dashboard';

const router = express.Router();
router.use('/chart', chart);
router.use('/dash', dashboard);

export default router;