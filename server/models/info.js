import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    elasticQuery: String,
    chartType: String
});

export default mongoose.model('info', InfoSchema, 'info');