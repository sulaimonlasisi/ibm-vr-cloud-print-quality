const fs = require('fs');
var storageClient = require('./pkg_cloud_storage_conn.js').storageClient
var variables = require("../config/variables.js").variables

/*sample function to get all containers

storageClient.getContainers(function (err, containers) {
  if (err) {
  	console.log("We have an error here "+containerList);
    console.error(err);
  }
  containers.forEach(function (container) {
    console.log(container.toJSON());
  });
});

*/


//sample function to upload to a container

var readStream = fs.createReadStream(variables.object_to_upload_local_path);
var writeStream = storageClient.upload({
container: variables.container,
remote: variables.remote
});

writeStream.on('error', function(err) {
  console.log("File upload failed");
});

writeStream.on('success', function(file) {
  console.log("File upload succeeded");
});

readStream.pipe(writeStream);
