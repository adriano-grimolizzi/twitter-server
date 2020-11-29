const LanguageDetect = require("languagedetect");

const languageDetector = new LanguageDetect();

class Tweet {
  constructor(data) {
    this.id = data.id;
    this.authorId = data.author_id;
    this.createdAt = data.created_at;
    this.text = data.text;
    this.languageInfo = detectLanguage(this.text);
  }

  print() {
    console.log(`Id: ${this.id}
                 Created: ${this.createdAt}
                 Author ID: ${this.authorId}
                 Text: ${this.text}`);
  }
}

const detectLanguage = (text) => {
  const result = languageDetector.detect(text, 1)[0];
  return {
    language: result[0],
    confidenceScore: result[1],
  };
};

module.exports = Tweet;
