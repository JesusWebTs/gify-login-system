import { app } from "./app.js";

const PORT = app.get("PORT"),
  HOST = app.get("HOST");
app.listen(PORT, HOST, () => {
  console.log(`Server is Started ${HOST} on port ${PORT}`);
});
