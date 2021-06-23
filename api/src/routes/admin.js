const express = require("express");
const router = express.Router();
const {
  getUsers,
  removeUser,
  getArticles,
  removeArticle,
} = require("../controllers/admin");
const { admin, protect } = require("../middlewares/auth");

router.route("/users").get(protect, admin, getUsers);
router.route("/articles").get(protect, admin, getArticles);
router.route("/users/:username").delete(protect, admin, removeUser);
router.route("/articles/:id").delete(protect, admin, removeArticle);

module.exports = router;
