const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");
const { findOneByEmail } = require("../services/user");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await findOneByEmail(email);
    if (!user) {
      return res.status(404).json({ err: "Usuário não encontrado" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          user_id: user._id,
          role: user.admin ? "ADMIN" : "USER",
        },
        SECRET
      );
      return res.json({
        token: token,
      });
    } else {
      return res.status(400).json({ err: "Senha incorreta" });
    }
  },
};
