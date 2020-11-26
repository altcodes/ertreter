const Article = require('./model');

// Récuperation de l'article
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
//Création de l'article 
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
//Suppression de l'article
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
//Mise a jour de l'article
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
