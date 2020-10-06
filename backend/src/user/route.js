const express = require('express');
const userController = require('./controller');
const router = express.Router();

router.get('/', userController.getUsers);
// router.get('/:id', userController.getUser);
router.get('/:email', userController.getUserByEmail);
router.get('/:id/articles', userController.getArticles);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
