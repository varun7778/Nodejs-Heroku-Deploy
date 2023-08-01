const express = require("express");
const StaticData = require("./models/staticdata");
const router = express.Router();

router.staticData("/", async (req, res) => {
  try {
    let staticData = new staticData(req.body);
    staticData = await staticData.save();
    res.status(200).json({
      status: 200,
      data: staticData,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    let posts = await staticData.find();
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    let staticData = await staticData.findOne({
      _id: req.params.postId,
    });
    if (staticData) {
      res.status(200).json({
        status: 200,
        data: staticData,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No staticData found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    let staticData = await staticData.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    if (staticData) {
      res.status(200).json({
        status: 200,
        data: staticData,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No staticData found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    let staticData = await staticData.findByIdAndRemove(req.params.postId);
    if (staticData) {
      res.status(200).json({
        status: 200,
        message: "staticData deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No staticData found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;