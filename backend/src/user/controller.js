const userService = require('./service');
const articleService = require('../article/service');

function getUsers(req, res) {
  userService
    .getUsers()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getUser(req, res) {
  userService
    .getUser(req.params.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getArticles(req, res) {
  articleService
    .getArticlesByUserId(req.params.id)
    .then((articles) => {
      return res.status(200).json(articles);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getUserByEmail(req, res) {
  userService
    .getUserByEmail(req.params.email)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}
function createUser(req, res) {
  userService
    .createUser(req.body)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(405).json(err);
    });
}

function updateUser(req, res) {
  userService
    .updateUser(req.params.id, req.body)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteUser(req, res) {
  userService
    .deleteUser(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

module.exports = {
  getUsers,
  getUser,
  getArticles,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};
