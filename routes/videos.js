const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use((req, res, next) => {
  console.log(`Request from ${req.path}`);
  next();
});

// get JSON data and parse to a JS object
function readVideos() {
  const videoData = fs.readFileSync("./data/video-details.json");
  const parsedVideos = JSON.parse(videoData);
  return parsedVideos;
}

//converting to JSON
function writeVideos(data) {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("./data/video-details.json", stringifyData);
}

// use data to populate Next Video List
router.get("/", (req, res) => {
  const videos = readVideos();
  const condensedVideo = videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).json(condensedVideo);
});

// get current video by id
router.get("/:id", (req, res) => {
  const videos = readVideos();
  const selectedVideo = videos.find((video) => video.id === req.params.id);
  if (!selectedVideo) {
    return res.status(404).send("Oops, that video does not exist");
  }
  res.json(selectedVideo);
});

//post uploads
router.post("/", (req, res) => {
  const video = readVideos();

  let uploadData = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Kanye West Official",
    image: "http://localhost:7070/images/kanyeheader.jpeg",
    description: req.body.description,
    views: "4,243,990",
    likes: "58,000",
    duration: "3:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [
      {
        name: "Kanye West",
        comment: "I should win an Oscar for this",
        id: uuidv4(),
        likes: 0,
        timestamp: Date.now(),
      },
      {
        name: "Pete Davidson",
        comment: "Not a fan",
        id: uuidv4(),
        likes: 0,
        timestamp: Date.now(),
      },
    ],
  };

  if (!uploadData.title) {
    return res.status(400).json({
      message: "A title is required",
    });
  }

  if (!uploadData.description) {
    return res.status(400).json({
      message: "A description is required",
    });
  }

  video.push(uploadData);

  writeVideos(video);

  res.status(201).json(uploadData);
});

module.exports = router;
