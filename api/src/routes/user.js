const express = require("express");
const router = express.Router();
const {
  toggleSubscribe,
  getFeed,
  editUser,
  searchUser,
  getProfile,
  recommendChannels,
  getLikedArticles,
  getHistory,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.route("/").put(protect, editUser);
router.route("/").get(protect, recommendChannels);
router.route("/likedArticles").get(protect, getLikedArticles);
router.route("/history").get(protect, getHistory);
router.route("/feed").get(protect, getFeed);
router.route("/search").get(protect, searchUser);
router.route("/:id").get(protect, getProfile);
router.route("/:id/togglesubscribe").get(protect, toggleSubscribe);

module.exports = router;
