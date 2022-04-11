import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {DevelopmentSchema} from './development.js';

const HackathonSchema = new Schema({
    name: String,
    description: String,
    location: String,
    id: {type: Number, default: 0, unique: true, dropups: true},
    entries: [DevelopmentSchema],
    startDate: { type: Date, default: Date.now },
});

const Hackathon = mongoose.model('Hackathon', HackathonSchema);

export const HackathonParticipant = mongoose.model('HackathonParticipant', HackathonParticipantSchema);

export default Hackathon;
