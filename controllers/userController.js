import {
  findUserByUsername,
  createFav,
  deleteFav,
  findFav,
  findAllFavs,
  createUser,
} from "../models/UserModel.js";
import {
  setUserSession,
  unsetUserSesion,
  findUserIdByJWT,
} from "../models/SessionModel.js";

const userLogin = async (req, res) => {
  const userBody = req.body;
  const { userName, password, ...data } = userBody;
  const cb = (data) => {
    /* if(data.error) console.warn(data.errorMessage) */
    res.status(data.status);
    res.json(data);
  };

  try {
    const user = await findUserByUsername(userName);
    if (userName === user.userName && password === user.password) {
      const jwt = await setUserSession(user._id, { ...data });
      return cb({
        login: true,
        jwt,
        error: false,
        errorMessage: "",
        status: 200,
      });
    } else {
      return cb({
        login: false,
        jwt: null,
        error: true,
        errorMessage: "User Not Found",
        status: 404,
      });
    }
  } catch (error) {
    return cb({
      login: false,
      jwt: null,
      error: true,
      errorMessage: error || "Internal server error",
      status: 500,
    });
  }

  loginUser(user, cb);
};
const userSignUp = async (req, res) => {
  const { userName, password } = req.body;
  const cb = (data) => {
    res.status(data.status);
    res.json(data);
  };
  const existUser = await findUserByUsername(userName);
  let userWasCreated;
  if (!existUser) {
    userWasCreated = await createUser({ userName, password }, cb);
  } else {
    return cb({
      userId: true,
      error: true,
      errorMessage: "User already exist",
      status: 409,
    });
  }
};
const userLogout = async (req, res) => {
  const { jwt } = req.params;
  const cb = (data) => {
    res.status(200);
    res.json({ data });
  };
  unsetUserSesion(jwt, cb);
};
const updateFav = async (req, res) => {
  const { jwt } = req.body;
  const imgId = req.params.id;
  const cb = (data) => {
    res.status(data.status);
    res.json(data);
  };
  try {
    const userId = await findUserIdByJWT(jwt);
    if (userId) {
      const checkFav = await findFav(userId, imgId, cb);
      let updated;
      if (!checkFav) {
        updated = await createFav(userId, imgId, cb);
      } else {
        updated = await deleteFav(userId, imgId, cb);
      }
    }
  } catch (err) {
    const errorMessage =
      err.errorMessage || "Internal server Error at findUserIdByJWT";
    cb({
      userId: false,
      error: true,
      errorMessage,
      status: 500,
    });
  }
};
const getFavs = async (req, res) => {
  const jwt = req.header("Authorization");
  const cb = (data) => {
    res.status(data.status);
    res.json(data);
  };
  try {
    const userId = await findUserIdByJWT(jwt, cb);

    let fav;
    if (userId) {
      fav = await findAllFavs(userId, cb);
    }
  } catch (err) {
    const errorMessage =
      err.errprMessage || "Internal server Error at findUserIdByJWT";
    cb({
      userId: false,
      error: true,
      errorMessage,
      status: 500,
    });
    throw new Error(errorMessage);
  }
};

export { userLogin, userSignUp, userLogout, updateFav, getFavs };
