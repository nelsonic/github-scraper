const fs = require("fs")
const gs = require("../lib/switcher");
const url = "nelsonic" // a random username
gs(url, function(err, data) {

  fs.writeFileSync(__dirname + "/" + url + ".json", JSON.stringify(data))
  console.log(data); // or what ever you want to do with the data
})
