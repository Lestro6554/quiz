import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    fullname: {type: String, required: true}
})

const UserModel = mongoose.model("Users", UserSchema, "Users");
export default UserModel