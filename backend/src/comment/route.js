const express = require('express');
const commentController = require('./controller');
const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getComment);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
