const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");

module.exports = {
  validateAuth(roles = ["ADMIN", "USER"]) {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, SECRET);
        if (roles.includes(user.role)) {
          req.userId = user.user_id;
          req.userEmail = user.user_email;
          return next();
        } else
          return res.status(401).json({ message: "Usuário não autorizado" });
      }
      return res.status(401).json({ message: "Usuário não autorizado" });
    };
  },
};
