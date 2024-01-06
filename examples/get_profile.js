const fs = require("fs")
const gs = require("../lib/switcher");
const url = "andrew" // "iteles" // a random username
gs(url, function(err, data) {

  fs.writeFileSync(__dirname + "/" + url + ".json", JSON.stringify(data, null, 2))
  console.log(data); // or what ever you want to do with the data
})
