const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");

module.exports = {
  validateAuth(roles = ["ADMIN", "USER"]) {
    return (req, res, next) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, SECRET);
        if (roles.includes(user.role)) next();
      }
      return res.status(401).json({ err: "Usuário não autorizado" });
    };
  },
};
