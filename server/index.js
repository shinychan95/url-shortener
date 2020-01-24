
const express = require("express"); // Node.js *So Hot* web application framework
const constants = require("./config/constants")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = constants.mongoUrl;
const connectOptions = { 
  //keepAlive: true
  // 위 조건이 있으면, 터미널에서 mongod로 켰던 서버를 종료시켜도 종료되지 않는다. 
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log(`Error`, err); 
  console.log(`Connected to MongoDB`); 
});


const app = express(); 
// CORS 허용을 위한 코드
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.use(bodyParser.json());

require("./models/UrlShorten")
require("./routes/urlshorten")(app);

const PORT = 7000; 

app.listen(PORT, () => { 
  console.log(`Server started on port`, PORT); 
});