const express = require("express")();
const cors = require("cors");
const promiseFactory = require("./promiseFactory");
const utils = require("./utils");

express.use(cors());

async function handleGet(expRequest, expResponse) {
  const { keyword } = expRequest.params;

  try {
    const twitterResponse = await promiseFactory.getTwitterPromise(keyword);

    // Get an array of 'Tweet' objects from the response body
    const originalTweets = utils.parseTweets(twitterResponse);

    // Sentiment Analysis only supported for english tweets
    const englishTweets = originalTweets.filter(t => t.languageInfo.language === 'english');

    // Python Api only needs the id and the text
    const marshalledTweets = englishTweets.map(t => ({ id: t.id, text: t.text }));

    const pythonResponse = await promiseFactory.getPythonPromise({
      tweets: marshalledTweets,
    });

    const pythonTweets = pythonResponse.data.analysedTweets;

    // const joinedTweets = originalTweets.map((tweet) => ({
    //   ...tweet,
    //   pText: pythonTweets.find((pTweet) => pTweet.id === tweet.id).text,
    //   sentiment: pythonTweets.find((pTweet) => pTweet.id === tweet.id).sentiment,
    // }));

    expResponse.send({ 
      overallSentiment: `People are ${pythonResponse.data.overallSentiment} about this!`,
      tweets: pythonTweets });
  } catch (error) {
    console.error(error);
  }
}

express.get("/api/tweets/:keyword", handleGet);

express.listen(4000, () => {
  console.log("App listening at http://localhost:4000");
});
