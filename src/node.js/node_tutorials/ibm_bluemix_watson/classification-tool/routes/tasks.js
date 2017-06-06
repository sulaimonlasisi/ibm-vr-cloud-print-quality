var express = require('express');
var router = express.Router();


//Require controller module
var watson_controller = require('../controllers/taskController');


/* GET home page that lists available classifiers */
router.get('/', watson_controller.listClassifiers);




// Get page where you can classify an object
router.get('/classify', watson_controller.classify);


/*
// Get Update page where you can update your custom classifier
router.get('/update', function (req, res) {
  res.render('index', { title: 'Update Classifier here' });
})


// Get Update page where you can delete your custom classifier
router.get('/delete', function (req, res) {
  res.send('Delete Classifier here')
})
*/

// Get create page where you can create your custom classifier
router.get('/create',watson_controller.createClassifier)

module.exports = router;