const fs = require('fs');
var pkgcloud = require('pkgcloud')
var variables = require("../config/variables.js").variables
var credentials = require("../config/pkg_cloud_variable.js").credentials
var storageClient = pkgcloud.storage.createClient(credentials); 


function getContainerFiles(container_name){
  /*
    function that gets details of all the files in a container.
    @param {string|object}	container_name			the name of the container to get files from
  */
  return new Promise((resolve, reject) => {
    storageClient.getFiles(container_name, (err, files) => {
      if (err) {
        console.log("Error while trying to get container files.");
        reject(err);
      }
      resolve(files);
    })
  })
}


function deleteAllContainerFiles(files){
  /*
    function that deletes all the files in a container. Mostly used after they getContainerFiles function has been called.
    @param {string|object}	files 					an array of the name of all files to be deleted.
  */
  return new Promise((resolve, reject) => {
    storageClient.bulkDelete(variables.container, files, (err) => {
      if (err) {
        reject(err);
        console.log("Error while trying to bulk delete files.");
      }
      resolve();
    })
  })
}

function upload_to_container(client) {
  /*
    function to upload to a container
    @param {string|object}	client 					the client that connects to the IBM ObjectStorage service and manipulates containers
    @param {string|object}	training_class_file		each training class file represents examples of a given class to be trained
  */
	variables.object_to_upload_local_path.forEach((training_class_file,index) =>{
		remote_string = training_class_file.split('/')
		var readStream = fs.createReadStream(training_class_file);
		var writeStream = client.upload({
		container: variables.container,
		remote: remote_string[remote_string.length-1] //remote is set to actual file name
		});
		writeStream.on('error', function(err) {
		  console.log("Training_class_file "+index+" upload failed");
		});
		writeStream.on('success', function(file) {
		  console.log("Training_class_file "+index+" upload succeeded");
		});
		readStream.pipe(writeStream);
	})	
}

function resetContainerThenUpload(container, client) {
  /*
    Deletes all the contents of a container and uploads new items into the container
    @param {string|object}	container				Container that is being deleted from. 
    @param {string|object}	client 					the client that connects to the IBM ObjectStorage service and manipulates containers    
  */
  getContainerFiles(container)
  .then((files)=> deleteAllContainerFiles(files))
  .then(()=>upload_to_container(client))
}

function prepareDownloadStreams(files){
  /*
    Gets an array of file details, creates a writestream for each filename and
    downloads the file from the container using its name and stream.

    @param {array}  files         array of file details which will be used to download the files.    
  */


  return new Promise((resolve, reject) => {
    files.forEach(function(file,index){
      console.log("File "+index+" is "+file.name)
      stream_name = file.name
      stream = fs.createWriteStream(stream_name)
      stream.on('error', function() {
        console.log("Error while trying to create stream.");
        console.log('error');
      });
      stream.on('finish', function() {
          if((index+1) === files.length) {
          resolve();
        }          
      });
      storageClient.download({
          container: file.container,
          remote: file.name
      }).pipe(stream);
    })
  })  
}
module.exports.storageClient = storageClient
module.exports.prepareDownloadStreams = prepareDownloadStreams
module.exports.resetContainerThenUpload = resetContainerThenUpload
module.exports.upload_to_container = upload_to_container
module.exports.deleteAllContainerFiles = deleteAllContainerFiles
module.exports.getContainerFiles = getContainerFiles

