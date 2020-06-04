const mongoose = require("mongoose");

module.exports = {
  validateId(req, res, next) {
    const { id } = req.params;

    if (mongoose.isValidObjectId(id))
      return res.status(400).json({ err: "Parâmetro Id inválido" });

    return next();
  },
};
