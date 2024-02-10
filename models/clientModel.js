const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Введите номер"],
    },
  },
  {
    timestamps: true,
  },
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
