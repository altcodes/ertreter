const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    upvote: { type: Number },
    downvote: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
