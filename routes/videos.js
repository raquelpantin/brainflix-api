const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// get JSON data and parse to a JS object
function readVideos() {
  const videoData = fs.readFileSync("./data/video-details.json");
  const parsedVideos = JSON.parse(videoData);
  return parsedVideos;
}

router.get("/", (req, res) => {
  const videos = readVideos();
  const condensedVideo = videos.map((video) => {
    return {
      id: video.id,
      //add the rest of the key value pairs that you will need here
    };
  });
  res.status(200).json(condensedVideo);
});

//go to video-details.json and add static image links

// get current video by id
router.get("/:id", (req, res) => {
  const videos = readVideos();
  const selectedVideo = videos.find((video) => video.id === req.params.id);
  if (!selectedVideo) {
    return res.status(404).send("Oops, that video does not exist");
  }
  res.json(selectedVideo);
});

module.exports = router;
