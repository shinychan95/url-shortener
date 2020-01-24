
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl='http://localhost/error';

// base 62
// object id generator가 아니라, 오름차순 숫자.
// shortid localhost 제거
// index를 결정할 때, base 62 변환 시 8 글자 되려면 100만부터

// mysql TEXT 형식 데이터 쓰기 않기
// var char : 가변 길이
// 데이터 1억개 되었을 때 -> encoding 된 데이터를 디코드해서 바로 key 접근
// 누가봐도 코드만 볼 때 이해할 수 있는 것은 생략.

// 이사님이 뽑은 이유가 과연. 벽을 이미 넘은 것도 벽 앞에 있는 것.

module.exports = app => {
  app.get("/api/urlshortner/:code", async (req, res) => {
    const urlCode = req.params.code;
    // DB에서 parameter로 들어온 URL에 대해서 검색
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });
  
  app.post("/api/urlshortner", async (req, res) => {
    const { originalUrl, shortBaseUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
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