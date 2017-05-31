var pkgcloud = require('pkgcloud')
var fileName = "../config/pkg_cloud_credentials.json"
var credentials
try {
credentials = require(fileName)
//console.log("Reqion: "+credentials.region+ ", pw:  "+credentials.password)
} 
catch(err) {
  credentials = {}
  console.log("unable to read file '" + fileName + "': ", err)
};

//console.log("IBM session secret is:", credentials.projectId)
var storageClient = pkgcloud.storage.createClient(credentials); 
//objStorage = new ObjectStorage(credentials)

module.exports.storageClient = storageClient
