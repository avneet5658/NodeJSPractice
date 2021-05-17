const fs = require("fs");
// const dataBuffer = fs.readFileSync("1-json.json");
// const dataString = dataBuffer.toString();
// const dataJSON = JSON.parse(dataString);
// console.log(dataJSON.book.title);

const infoJSON = JSON.parse(fs.readFileSync("1-json.json").toString());
infoJSON.Name = "Pandey";
console.log(JSON.stringify(infoJSON));
fs.writeFileSync("1-json.json", JSON.stringify(infoJSON));
