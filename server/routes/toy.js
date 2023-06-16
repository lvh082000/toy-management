const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');

/**
 *  Customer Routes 
*/
router.get('/', toyController.homepage);
router.get('/about', toyController.about);
router.get('/add', toyController.addToy);
router.post('/add', toyController.postToy);
router.get('/view/:id', toyController.view);
router.get('/edit/:id', toyController.edit);
router.put('/edit/:id', toyController.editPost);
router.delete('/edit/:id', toyController.deleteToy);

router.post('/search', toyController.searchToys);



module.exports = router;