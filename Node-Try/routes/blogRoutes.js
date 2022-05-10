const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

//Blog Routes
router.get('/', blogController.blog_index);

//Response to blogs create.
router.get('/create' , blogController.blog_create_get);

//POST Handlers
router.post('/', blogController.blog_create_post);

//Blog Details
router.get('/:id', blogController.blog_details);

//Deleete Single Handler
router.delete('/:id', blogController.blog_delete);

//Delete All Handler
router.delete('/', blogController.blog_delete_all);

//Search 
router.post('/search', blogController.blog_search);

module.exports = router;