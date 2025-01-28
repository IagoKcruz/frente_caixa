const { Router } = require("express");
const AuthController = require("../controllers/UserAuthController");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const routes = Router();

routes.post("/login", AuthController.login);
routes.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Rota acessível apenas para admins!" });
});

module.exports = routes;