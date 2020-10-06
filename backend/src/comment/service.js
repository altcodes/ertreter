const Comment = require('./model');

function getComment(id) {
  return new Promise((resolve, reject) => {
    Comment.findById(id)
      .then((comment) => {
        resolve(comment);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getComments() {
  return new Promise((resolve, reject) => {
    Comment.find({})
      .then((comments) => {
        resolve(comments);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getCommentsByArticleId(id) {
  return new Promise((resolve, reject) => {
    Comment.find({ article: id })
      .then((comments) => {
        resolve(comments);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createComment(params) {
  return new Promise((resolve, reject) => {
    const newComment = new Comment(params);
    newComment
      .save()
      .then((comment) => {
        resolve({ comment });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteComment(id) {
  return new Promise((resolve, reject) => {
    getComment(id).then((comment) => {
      if (comment) {
        Comment.deleteOne({ _id: id }).then((res) => {
          resolve(res);
        });
      } else {
        reject('user not exist');
      }
    });
  });
}

function updateComment(id, params) {
  return new Promise((resolve, reject) => {
    getComment(id).then((comment) => {
      if (comment) {
        Comment.updateOne({ _id: id }, params).then((res) => {
          resolve(res);
        });
      } else {
        reject('comment not exist');
      }
    });
  });
}

module.exports = {
  getComments,
  getComment,
  getCommentsByArticleId,
  createComment,
  deleteComment,
  updateComment
};
