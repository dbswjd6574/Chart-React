import express from 'express';
import axios from 'axios';
import request from 'request';
import mongoose from 'mongoose';
import Info from '../models/info';
const router = express.Router();

router.post('/dashBoard', (req, res) => {
    Info.find((err, docs) => {
        if (err) throw err;
        console.log(docs);
        res.json(docs);
     });
});
export default router;