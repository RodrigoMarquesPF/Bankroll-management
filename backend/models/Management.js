const mongoose = require("mongoose");

const managementSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  months: [
    {
      month: String,
      bets: Array,
    },
  ],
  type: {
    type: String,
    required: true, // Certifique-se de que é obrigatório
  },
  name: {
    type: String,
    required: true, // Certifique-se de que é obrigatório
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Management = mongoose.model("Management", managementSchema);

module.exports = Management;
