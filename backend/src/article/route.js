const express = require('express');
const articleController = require('./controller');
const router = express.Router();

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticle);
router.get('/:id/comments', articleController.getComments);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
