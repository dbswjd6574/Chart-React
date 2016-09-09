/**
 * Created by ±è´ëÇö on 2016-09-08.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    elasticQuery: String,
    chartType: String
});

export default mongoose.model('info', InfoSchema, 'info');