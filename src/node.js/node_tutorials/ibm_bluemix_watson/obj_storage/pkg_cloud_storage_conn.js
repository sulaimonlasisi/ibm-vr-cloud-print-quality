var pkgcloud = require('pkgcloud')
var fileName = "../config/pkg_cloud_credentials.json"
var credentials
try {
credentials = require(fileName)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};
var storageClient = pkgcloud.storage.createClient(credentials); 
module.exports.storageClient = storageClient
