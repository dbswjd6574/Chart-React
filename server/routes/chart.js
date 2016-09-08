import express from 'express';
import Chart from '../models/chart';
import axios from 'axios';
import request from 'request';
const router = express.Router();


/*
  POST /api/chart/getData
 */
router.post('/getData', (req, res) => {

    const requestBody = {
        "query": {
            "filtered": {
                "query": {
                    "query_string": {
                        "analyze_wildcard": true,
                        "query": "*"
                    }
                },
                "filter": {
                    "bool": {
                        "must": [
                            {
                                "range": {
                                    "watch_time": {
                                        "gte": 1441696090970,
                                        "lte": 1473318490971,
                                        "format": "epoch_millis"
                                    }
                                }
                            }
                        ],
                        "must_not": []
                    }
                }
            }
        },
        "size": 0,
        "aggs": {
            "2": {
                "terms": {
                    "field": "channel_number",
                    "size": 50,
                    "order": {
                        "1": "desc"
                    }
                },
                "aggs": {
                    "1": {
                        "sum": {
                            "field": "watch_min.0"
                        }
                    }
                }
            }
        }
    };

    request.post({url: 'http://172.16.33.216:9200/_search',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify(requestBody)
        }, function(error, response, body) {
            if (error) {
                console.error('error: ', error);
            } else {
                console.info('success', body);
            }
            return res.send(body);
        }
    );

    /*request.post({url: 'http://172.16.33.216:9200/', formData: requestBody}, function(error, response, body) {
            if (error) {
                console.error('error: ', error);
            } else {
                console.info('success', body);
            }
            return res.send(body);
        }
    );*/
/*
    request.post({url: url + apiName, formData: params}, function (err, httpResponse, body) {
        if (callback) {
            try {
                callback(JSON.parse(body));
            } catch (e) {
                callback(body);
            }
        }
    });*/

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