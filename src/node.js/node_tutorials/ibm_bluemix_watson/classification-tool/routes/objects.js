var express = require('express');
var router = express.Router();

//Require controller module
var object_controller = require('../controllers/objectController');

/* GET home page that lists the name of all objects in current container */
router.get('/', object_controller.getFilesInContainer);


/* Upload objects to current container */
router.get('/upload-objects', object_controller.uploadToContainer);
  


//Delete all objects in current container
router.get('/delete-objects', object_controller.deleteAllContainerFiles);


//Download all objects in current container
router.get('/download-objects', object_controller.downloadFiles);



//Updates made to current container by deleting old files and adding new ones
router.get('/update-container', object_controller.reloadObjects);

module.exports = router;
