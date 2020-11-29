const axios = require("axios");
const config = require("./config");

const factory = {};

factory.getTwitterPromise = (keyword) =>
  axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${keyword}`, {
    headers: { Authorization: config.bearerToken },
    params: {
      max_results: 30,
      "tweet.fields": "author_id,created_at",
    },
  });

  factory.getPythonPromise = (body) =>
  axios({
    method: "post",
    url: "http://0.0.0.0:5000/tweets",
    data: body,
  });

module.exports = factory;
