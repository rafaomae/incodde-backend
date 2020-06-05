const mongoose = require("mongoose");

module.exports = {
  validateId(req, res, next) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "Parâmetro Id inválido" });

    return next();
  },
};
