const fs = require('fs');
var storage_conn = require('../public/javascripts/obj_storage/pkg_cloud_storage_conn.js')
var variables = require('../public/javascripts/config/variables.js').variables

/*
Call to reset container then upload new files
*/
exports.reloadObjects = function(req, res) {
	//change variables.container to an input from request
	//storage_conn.Client can also be internally passed into the function
    storage_conn.resetContainerThenUpload(variables.container, storage_conn.storageClient).then((info)=> {res.send(info)})
}



exports.getFilesInContainer = function(req, res) {
	//container should be passed in from the UI
	storage_conn.getContainerFiles(variables.container)
    .then((files)=> {res.send(files)})
}


exports.uploadToContainer = function(req, res) {
	// container should be passed in from the UI
	storage_conn.uploadToContainer(storage_conn.storageClient).then((upload_array)=> {res.send(upload_array)})
}

exports.deleteAllContainerFiles = function(req, res) {
	// container should be passed in from the UI
  storage_conn.getContainerFiles(variables.container)
  .then((files)=> storage_conn.deleteAllContainerFiles(files)).then((info)=> {res.send(info)})
}

exports.downloadFiles = function(req, res) {
	// container should be passed in from the UI
	storage_conn.getContainerFiles(variables.container)
    .then((files) => storage_conn.prepareDownloadStreams(files)).then((info)=>{res.send(info)})
}
