const commentService = require('./service');

function getComments(req, res) {
  commentService
    .getComments()
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function getComment(req, res) {
  commentService
    .getComment(req.params.id)
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
}

function createComment(req, res) {
  commentService
    .createComment(req.body)
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((err) => {
      return res.status(405).json(err);
    });
}

function updateComment(req, res) {
  commentService
    .updateComment(req.params.id, req.body)
    .then((comment) => {
      return res.status(200).json(comment);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

function deleteComment(req, res) {
  commentService
    .deleteComment(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};
