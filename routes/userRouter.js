import express from "express";
import {
  userLogin,
  userSignUp,
  userLogout,
  updateFav,
  getFavs,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200);
  res.send("Hello world");
  req.header("Authorization");
});

router
  .post("/login", userLogin)
  .post("/logup", userSignUp)
  .post("/logout/:jwt", userLogout);

router.post("/favs/:id", updateFav).get("/favs", getFavs);
export default router;
