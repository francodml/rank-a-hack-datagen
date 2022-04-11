import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique:true, dropups:true},
    userId: {type: Number, default: 0, unique: true, dropups: true},
    firstName: String,
    lastName: String,
    location: String,
    hackathons: [Schema.Types.ObjectId],
    avatarUrl: String,
    email: String,
});

const User = mongoose.model('User', UserSchema);
export default User;