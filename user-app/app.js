const request = require("request");

const url = "https://jsonplaceholder.typicode.com/users";

request({ url: url }, (error, response) => {
  const datas = JSON.parse(response.body);
  datas.map((data) => console.log(data.name));
});
