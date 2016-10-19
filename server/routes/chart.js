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
            "arrays": {
                "terms": {
                    "field": "channel_number",
                    "size": 50,
                    "order": {
                        "using_value": "desc"
                    }
                },
                "aggs": {
                    "using_value": {
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
});

router.post('/datasetList', (req, res) => {
    request.post({url: 'http://172.16.33.156:8080/sea/datasetList'
        }, function(error, response, body) {
            if (error) {
                console.error('error: ', error);
            } else {
                console.info('success', body);
            }
            return res.send(JSON.parse(body));
        }
    );
});

router.post('/logData', (req, res) => {


    request.post({url: 'http://localhost:3001/countLogData.json'
        }, function(error, response, body) {
            if (error) {
                console.error('error: ', error);
            } else {
                console.info('success', body);
            }
            return res.send(JSON.parse(body));
        }
    );

});

router.post('/fieldList', (req, res) => {

    let requestBody = req.body;

    console.log('requestBody', requestBody);
    request.post({url: 'http://172.16.33.216:3001/fieldList',
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
            return res.send(JSON.parse(body));
        }
    );

});

router.post('/status', (req, res) => {

    let requestBody = req.body;

    console.log('requestBody', requestBody);
    request.post({url: 'http://172.16.33.216:3001/status',
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
            return res.send(JSON.parse(body));
        }
    );

});

router.post('/query', (req, res) => {

    let requestBody = req.body;

    console.log('requestBody', requestBody);
    request.post({url: 'http://172.16.33.216:3001/query',
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
            return res.send(JSON.parse(body));
        }
    );

});

export default router;