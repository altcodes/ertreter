const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    urlImage: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Article', ArticleSchema);
