// Before Refactoring
// { 
//   "_id" : ObjectId("5e15dc1722d31d3c44b7a26a"),  
//   "originalUrl" : "https://www.google.com/", 
//   "shortUrl" : "http://localhost/-3DBjLgY",
//   "urlCode" : "-3DBjLgY",
//   "updatedAt" : ISODate("2020-01-08T13:41:43.027Z"), 
//   "createdAt" : ISODate("2020-01-08T13:41:43.050Z"), 
//   "__v" : 0 
// }

const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlShortenSchema = new Schema({
  idx: { type: Number, index: true },
  originalUrl: { type: String, unique: true },
  shortened: { type: String, index: true },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("UrlShorten", urlShortenSchema);
