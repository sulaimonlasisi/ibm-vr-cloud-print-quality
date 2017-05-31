const fs = require('fs');
var storageClient = require('./pkg_cloud_storage_conn.js').storageClient
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

var readStream = fs.createReadStream('C:/Users/sulasisi/Documents/summer_2017_cloud_print_quality_project/ibm_visual_recognition/data/image_test/neg.zip');
var writeStream = storageClient.upload({
container: '9ja_drinks_custom_classifier_container',
remote: 'neg.zip'
});

writeStream.on('error', function(err) {
  console.log("File upload failed");
});

writeStream.on('success', function(file) {
  console.log("File upload succeeded");
});

readStream.pipe(writeStream);

//