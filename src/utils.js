const Tweet = require("./model/Tweet");

const utils = {};

utils.parseTweets = (responseBody) =>
    responseBody.data.data.map((data) => new Tweet(data));

module.exports = utils;