const express = require("express");
const app = express();
const cors = require("cors");
const videosRoutes = require("./routes/videos");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.use("/videos", videosRoutes);

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
