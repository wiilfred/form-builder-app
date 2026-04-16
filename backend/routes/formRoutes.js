const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

// Create form
router.post("/", async (req, res) => {
  const form = await Form.create(req.body);
  res.json(form);
});

// Get all forms
router.get("/", async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

// Get single form
router.get("/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

module.exports = router;
