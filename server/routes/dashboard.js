/**
 * Created by ±è´ëÇö on 2016-09-08.
 */
import express from 'express';
import axios from 'axios';
import request from 'request';
import mongoose from 'mongoose';
import Mongo from '../models/mongos';

const router = express.Router();

router.get('/dashBoard', (req, res) => {
    console.log("req :: " + req);
    console.log("res :: " + res);
    res.send("YYY");

    var mongos = new Mongo();
    mongos.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        console.log(books);
        res.json(books);
    });
});