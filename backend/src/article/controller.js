const articleService = require('./service');
const commentService = require('../comment/service');

function getArticles(req, res) {
  articleService
    .getArticles()
    .then((articles) => {
      return res.status(200).json(articles);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getArticle(req, res) {
  articleService
    .getArticle(req.params.id)
    .then((article) => {
      return res.status(200).json(article);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getComments(req, res) {
  commentService
    .getCommentsByArticleId(req.params.id)
    .then((article) => {
      return res.status(200).json(article);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function createArticle(req, res) {
  articleService
    .createArticle(req.body)
    .then((article) => {
      return res.status(200).json(article);
    })
    .catch((err) => {
      return res.status(405).json(err);
    });
}

function updateArticle(req, res) {
  articleService
    .updateArticle(req.params.id, req.body)
    .then((article) => {
      return res.status(200).json(article);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteArticle(req, res) {
  articleService
    .deleteArticle(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

module.exports = {
  getArticles,
  getArticle,
  getComments,
  createArticle,
  updateArticle,
  deleteArticle
};
