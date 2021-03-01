import { sessionModel } from "./schemas/sessionsSchema.js";
import { v4 as uuidv4 } from "uuid";

/*------------------------------------------*/

const setUserSession = async (id, data) => {
  const jwt = uuidv4();
  return sessionModel
    .updateOne(
      { userId: id },
      {
        $push: {
          sessions: {
            login_date: new Date(Date.now()).toUTCString(),
            deviceInfo: data.deviceInfo,
            geolocation: data.geolocation,
          },
          jwt,
        },
      },
      {
        upsert: true,
      }
    )
    .then((res) => {
      if (res.ok) return jwt;
      else {
        throw Error("Cant create a new session");
      }
    })
    .catch((err) => {
      throw Error(err || "Server Error");
    });
};

const findUserSession = (jwt, cb) => {
  return sessionModel
    .findOne(
      {
        jwt: { $all: [jwt] },
      },
      {
        jwt: 1,
      }
    )
    .then((res) => {
      cb() || null;
      return res.jwt[0] || null;
    })
    .catch((err) => {
      /* console.log(err); */
    });
}; // check

const unsetUserSesion = (jwt, cb) => {
  return sessionModel
    .updateOne(
      {
        jwt: jwt,
      },
      {
        $pull: {
          jwt: jwt,
        },
      }
    )
    .then((res) => {
      return cb({
        login: false,
        jwt: null,
        error: false,
        errorMessage: "",
        status: 200,
      });
    })
    .catch((err) => {
      return err;
    });
};

const findUserIdByJWT = (jwt, cb) => {
  return sessionModel
    .findOne({ jwt }, { userId: 1 })
    .then((res) => {
      if (res) return res.userId;
      cb({
        userId: false,
        error: true,
        errorMessage: "JWT Not found",
        status: 404,
      });
      return false;
    })
    .catch((err) => {
      throw Error("Internal Server Error at findUserIdByJWT", { err });
    });
};

export { unsetUserSesion, setUserSession, findUserIdByJWT };
