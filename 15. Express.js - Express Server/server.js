// console.log("Hello World!");

const express = require('express');
const app = express();

app.get("/", function(request, response) {
  response.send("<h1> Hello World! </h1>");
});

app.get("/contact", function(request, response) {
  response.send("Contact me at: PixelFr0ggie.learn@gmail.com");
});

app.get("/about", function(request, response) {
  response.send("I am Aidan.");
});

app.get("/hobbies", function(request, response) {
  response.send("<ul> <li> Games </li> <li> Exercise </li> <li> Friends </li> </ul>");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
