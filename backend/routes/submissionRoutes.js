const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// Submit form
router.post("/", async (req, res) => {
  const data = await Submission.create(req.body);
  res.json(data);
});

// Get submissions
router.get("/:formId", async (req, res) => {
  const data = await Submission.find({ formId: req.params.formId });
  res.json(data);
});

module.exports = router;
