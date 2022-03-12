const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const videosRoutes = require("./routes/videos");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

// get data from heroku and convert to JSON
// axios.get(`${API_URL}/videos${API_KEY}`).then((response) => {
//   fs.writeFile("data/videos.json", JSON.stringify(response.data), () => {
//     console.log("file succesfully written");
//   });
// });

app.use("/videos", videosRoutes);

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
