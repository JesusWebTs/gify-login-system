import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userId: String,
  sessions: [],
  jwt: ["string"],
});

const sessionModel = mongoose.model("session", sessionSchema);

export { sessionModel };
