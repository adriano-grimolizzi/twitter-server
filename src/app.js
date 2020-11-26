const express = require("express")();
const cors = require("cors");
const promiseFactory = require("./promiseFactory");

const Tweet = require("./model/Tweet");

express.use(cors());

async function handleGet(expRequest, expResponse) {
  const { keyword } = expRequest.params;

  try {
    const twitterResponse = await promiseFactory.getTwitterPromise(keyword);
    const tweets = twitterResponse.data.data.map((data) => new Tweet(data));
    // const pythonResponse = {data: ''};
    const pythonResponse = await promiseFactory.getPythonPromise({
      tweets: tweets,
    });

    expResponse.send({ ...pythonResponse.data, tweets: tweets });
  } catch (error) {
    console.error(error);
  }
}

express.get("/api/tweets/:keyword", handleGet);

express.listen(4000, () => {
  console.log("App listening at http://localhost:4000");
});
