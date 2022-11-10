const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded( { extended: true } ));

app.use(express.static("public"));

app.get('/', (req, res) => {

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/f11ef70fa3";

  const options = {
    method: "post",
    auth: "aidan:f340090121c494b5ce7369964e94763c"
  }

  const request = https.request(url, options, (response) => {

      // console.log(response.statusCode);

      if (response.statusCode === 200) {

        // res.send("Successfully subscribed!");
        // res.sendFile(__dirname + "/success.html");

      } else {

        // res.send("There was an error with signing up, please try again!");
        res.sendFile(__dirname + "/failure.html");

      }

      response.on("data", (data) => {

        var jsonData = JSON.parse(data)
        console.log(jsonData);
        console.log(jsonData.error_count);

        if (jsonData.error_count === 0) {

          // res.send("Successfully subscribed!");
          res.sendFile(__dirname + "/success.html");

        } else {

          // res.send("There was an error with signing up, please try again!");
          res.sendFile(__dirname + "/failure.html");

        }

      });

  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", (req, res) => {

  res.redirect("/");

});

app.listen(port, () => {

  console.log("Server started on port: " + port);

});

// API Key
// f340090121c494b5ce7369964e94763c-us10

// Audience / List ID
// f11ef70fa3
