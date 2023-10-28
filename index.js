const express = require("express");
const app = express();
const path = require("path");
const resizeRoute = require("./routes/resize");
app.use(express.static("./uploads"));

global.__root = path.resolve(__dirname);

app.use("/api/resize", resizeRoute);

app.listen(4000, () => {
  console.log("Listening at port 4000");
});
