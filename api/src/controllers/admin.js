const { User, Article } = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ["id", "firstname", "lastname", "username", "email"],
  });

  res.status(200).json({ success: true, data: users });
});

exports.removeUser = asyncHandler(async (req, res, next) => {
  await User.destroy({
    where: { username: req.params.username },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.removeArticle = asyncHandler(async (req, res, next) => {
  await Article.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.getArticles = asyncHandler(async (req, res, next) => {
  const articles = await Article.findAll({
    attributes: ["id", "title", "description", "text", "thumbnail", "userId"],
  });

  res.status(200).json({ success: true, data: articles });
});
