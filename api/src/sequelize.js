const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const ArticleModel = require("./models/Article");
const ArticleLikeModel = require("./models/ArticleLike");
const CommentModel = require("./models/Comment");
const SubscriptionModel = require("./models/Subscription");
const ViewModel = require("./models/View");


const sequelize = new Sequelize("test1","postgres", "postgres", {
  dialect: "postgres"
});

(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);
const Article = ArticleModel(sequelize, DataTypes);
const ArticleLike = ArticleLikeModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Subscription = SubscriptionModel(sequelize, DataTypes);
const View = ViewModel(sequelize, DataTypes);

// Article - user association
Article.belongsTo(User, { foreignKey: "userId" });

// likes association
User.belongsToMany(Article, { through: ArticleLike, foreignKey: "userId" });
Article.belongsToMany(User, { through: ArticleLike, foreignKey: "articleId" });

// comments association
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User, { foreignKey: "userId" });

Article.hasMany(Comment, {
  foreignKey: "articleId",
});

// subscription association
User.hasMany(Subscription, {
  foreignKey: "subscribeTo",
});

// views association
User.belongsToMany(Article, { through: View, foreignKey: "userId" });
Article.belongsToMany(User, { through: View, foreignKey: "articleId" });

module.exports = {
  User,
  Article,
  ArticleLike,
  Comment,
  Subscription,
  View,
};
