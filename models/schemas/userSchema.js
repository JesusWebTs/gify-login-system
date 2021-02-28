import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  favs: [],
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
