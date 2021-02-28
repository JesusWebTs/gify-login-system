import { join } from "path";
export default {
  server: {
    HOST: "localhost",
    PORT: process.env.PORT || 8000,
  },
  db: {
    HOST: "",
    PORT: "",
  },
  express_sets: {
    /* api: {
      routes: {
        mainRouter: join(__dirname, "routes/userRouter.js"),
        mainRouter: join(__dirname, "routes/gifFav.js"),
      },
    }, */
  },
};
