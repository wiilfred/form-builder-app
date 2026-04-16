const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    formId: String,
    answers: Object,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Submission", submissionSchema);
