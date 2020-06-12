const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");
const { findOneByEmail } = require("../services/user");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await findOneByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Usuário não encontrado" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          user_id: user._id,
          user_email: user.email,
          role: user.isAdmin ? "ADMIN" : "USER",
        },
        SECRET
      );
      return res.json({
        name: user.name,
        email: user.email,
        token: token,
        isAdmin: user.isAdmin,
        confirmed: user.confirmed,
      });
    } else {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Senha incorreta" });
    }
  },
};
