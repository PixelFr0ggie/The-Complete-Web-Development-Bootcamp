const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {

  res.sendFile(__dirname + "/bmiCalculator.html");

});

app.post("/", (req, res) => {

  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);  
  var bmiResult = weight / (height * height);

  res.send("<h1> Your BMI is " + bmiResult + "</h1>");

});

app.listen(port, () => {

    console.log("Server started on port: " + port);

});
