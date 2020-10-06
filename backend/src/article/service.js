const Article = require('./model');

function getArticle(id) {
  return new Promise((resolve, reject) => {
    Article.findById(id)
      .populate('user')
      .then((article) => {
        resolve(article);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getArticles() {
  return new Promise((resolve, reject) => {
    Article.find({})
      .populate('user')
      .then((articles) => {
        resolve(articles);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getArticlesByUserId(id) {
  return new Promise((resolve, reject) => {
    Article.find({ user: id })
      .then((articles) => {
        resolve(articles);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createArticle(params) {
  return new Promise((resolve, reject) => {
    const newArticle = new Article(params);
    newArticle
      .save()
      .then((article) => {
        resolve({ article });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    getArticle(id).then((article) => {
      if (article) {
        Article.deleteOne({ _id: id }).then((res) => {
          resolve(res);
        });
      } else {
        reject('user not exist');
      }
    });
  });
}

function updateArticle(id, params) {
  return new Promise((resolve, reject) => {
    getArticle(id).then((article) => {
      if (article) {
        Article.updateOne({ _id: id }, params).then((res) => {
          resolve(res);
        });
      } else {
        reject('article not exist');
      }
    });
  });
}

module.exports = {
  getArticles,
  getArticle,
  getArticlesByUserId,
  createArticle,
  deleteArticle,
  updateArticle
};
