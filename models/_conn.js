import mongoose from "mongoose";
import credentials from "../credentials.js";
const { dbPassword, dbUser } = credentials;
const dbTarget = "users";
const DbURI = `mongodb+srv://${dbUser}:${dbPassword}@gifi.wsuv8.mongodb.net/${dbTarget}?retryWrites=true&w=majority`;

const conn = mongoose
  .connect(DbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB is Connected");
    console.log("---------------");
  })
  .catch((err) => {
    console.log(err);
  });

export default conn;
