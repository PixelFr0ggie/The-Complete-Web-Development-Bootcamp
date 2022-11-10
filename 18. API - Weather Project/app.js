const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded( { extended: true } ));

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {

  // console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "67f02e26422f8e7e210cb04d897d3113";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;

  https.get(url, (response) => {

    console.log(response.statusCode);

    response.on("data", (data) => {

      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const temp = weatherData.main.temp;
      // console.log(temp);

      const weatherDesc = weatherData.weather[0].description;
      // console.log(weatherDesc);

      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1> The weather is currently " + weatherDesc + " </h1>");
      res.write("<h1> The temperature in " + query + " is " + temp + " degrees Celcius. </h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();

    });
  });

})

app.listen(port, () => {

  console.log("Server started on port: " + port);

});
