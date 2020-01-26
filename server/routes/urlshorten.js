
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const errorUrl='http://localhost/error';

const base62 = {
  charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split(''),
  encode: integer => {
    if (integer === 0) {
      return 0;
    }
    let s = [];
    while (integer > 0) {
      s = [base62.charset[integer % 62], ...s];
      integer = Math.floor(integer / 62);
    }
    return s.join('');
  },
  decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};

module.exports = app => {
  app.get("/api/urlshortner/:code", async (req, res) => {
    const urlCode = req.params.code;
    const idx = base62.decode(urlCode) - 10000000000000
    const item = await UrlShorten.findOne({ idx: idx });
    if (item) {
      console.log(item.originalUrl)
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });
  
  app.post("/api/urlshortner", async (req, res) => {
    const { originalUrl } = req.body;
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else { // 이후 원본 URL을 redirect 할 때 빠르게 찾기 위해서 idx
          const idx = await UrlShorten.count({});
          const shortened = base62.encode(idx + 10000000000000)
          const item = new UrlShorten({
            idx,
            originalUrl,
            shortened,
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });
};