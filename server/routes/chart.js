import express from 'express';
import Chart from '../models/chart';

const router = express.Router();

/*
  POST /api/chart/getData
 */
router.post('/getData', (req, res) => {

    /*Chart.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        let chart = new Chart({
            data: req.body.data
        });

        Chart.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });*/
});

export default router;