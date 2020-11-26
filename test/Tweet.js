const { expect } = require("chai");

const Tweet = require("../src/model/Tweet");

describe("Tweet test", () => {
  it("should determine language", () => {
    const italianPhrase = 'tuo padre e un ladro ha rubato le stelle per metterle nei tuoi occhi';
    const englishPhrase = 'Can you touch my hand? I want to tell my friends I’ve been touched by an angel.';

    const italianTweet = new Tweet({id:"1", author_id:"a1", created_at:"c1", text: italianPhrase});
    const englishTweet = new Tweet({id:"2", author_id:"a2", created_at:"c2", text: englishPhrase});

    expect(englishTweet.languageInfo.language).to.equal("english");
    expect(italianTweet.languageInfo.language).to.equal("italian");
  });
});