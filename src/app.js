const express = require("express")();
const cors = require("cors");
const promiseFactory = require("./promiseFactory");

const Tweet = require("./model/Tweet");

express.use(cors());

async function handleGet(expRequest, expResponse) {
  const { keyword } = expRequest.params;

  try {
    const twitterResponse = await promiseFactory.getTwitterPromise(keyword);
    const twitterTweets = twitterResponse.data.data.map((data) => new Tweet(data));
    // const pythonResponse = {data: ''};
    const pythonResponse = await promiseFactory.getPythonPromise({
      tweets: twitterTweets,
    });
    const pythonTweets = pythonResponse.data;

    const join = twitterTweets.map((tweet) => ({
      ...tweet,
      score: pythonTweets.find((pTweet) => pTweet.id === tweet.id).score,
    }));

    expResponse.send({ tweets: join });
  } catch (error) {
    console.error(error);
  }
}

express.get("/api/tweets/:keyword", handleGet);

express.listen(4000, () => {
  console.log("App listening at http://localhost:4000");
});
