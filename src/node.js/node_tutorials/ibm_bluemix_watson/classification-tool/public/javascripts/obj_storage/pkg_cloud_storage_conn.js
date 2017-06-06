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
    var deletionConfirmation = "All "+files.length+ " files in container deleted."
    storageClient.bulkDelete(variables.container, files, (err) => {
      if (err) {
        reject(err);
        console.log("Error while trying to bulk delete files.");
      }
      resolve(deletionConfirmation);
    })
  })
}

function uploadToContainer(client) {
  //IMPORTANT: This has to be refactored to accept input from the page - Not working yet for input page

  /*
    function to upload to a container
    @param {string|object}	client 					the client that connects to the IBM ObjectStorage service and manipulates containers
    @param {string|object}	training_class_file		each training class file represents examples of a given class to be trained
  */
  return new Promise((resolve, reject) => {
    var upload_array = [];
    var upload_status
    var upload_count = 0
    variables.object_to_upload_local_path.forEach((training_class_file,index) =>{
      remote_string = training_class_file.split('/')
      var readStream = fs.createReadStream(training_class_file);
      var writeStream = client.upload({
      container: variables.container,
      remote: remote_string[remote_string.length-1] //remote is set to actual file name
      });
      writeStream.on('error', function(err) {
        upload_status = "Training_class_file "+index+" upload failed"
        console.log(upload_status);
        reject(error);
      });
      writeStream.on('success', function(file) {
        upload_count++
        upload_status = "Training_class_file "+index+" upload succeeded"
        upload_array.push(upload_status)
        console.log(upload_status);
        if(upload_count===3) {
          resolve(upload_array);
        }          
      });
      readStream.pipe(writeStream);
    })
  })	
}

function resetContainerThenUpload(container, client) {
  /*
    Deletes all the contents of a container and uploads new items into the container
    @param {string|object}	container				Container that is being deleted from. 
    @param {string|object}	client 					the client that connects to the IBM ObjectStorage service and manipulates containers    
  */
  return new Promise((resolve, reject) => { 
    getContainerFiles(container)
    .then((files)=> deleteAllContainerFiles(files))
    .then(()=>uploadToContainer(client)).catch(function (error){
      reject (error)
    })
    resolve("Container reset and upload done")
  })
}

function prepareDownloadStreams(files){
  /*
    Gets an array of file details, creates a writestream for each filename and
    downloads the file from the container using its name and stream.
    @param {array}  files         array of file details which will be used to download the files.    
  */
  return new Promise((resolve, reject) => {
    var download_count = 0
    var downloadConfirmation = "All "+files.length+ " files in container downloaded."
    files.forEach(function(file,index){
      console.log("File "+index+" is "+file.name)
      stream_name = file.name
      stream = fs.createWriteStream(stream_name)
      stream.on('error', function() {
        console.log("Error while trying to create stream.");
        console.log('error');
        reject(error);
      });
      stream.on('finish', function() {
        download_count++
        if(download_count === files.length){
          resolve(downloadConfirmation);
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
module.exports.uploadToContainer = uploadToContainer
module.exports.deleteAllContainerFiles = deleteAllContainerFiles
module.exports.getContainerFiles = getContainerFiles

