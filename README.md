# twitter-server

This application is a simple server that will retrieve Twitter posts based on a keyword, send them to another service for sentiment analysis, and then return the result. 

You can run this app with "npm start", but firts you have to put your Twitter Bearer Token in 'src/config.js' (no, I'm not giving you mine!).

You will see 'Bearer XXX' because the file has been marked as unchanged with:

git update-index --assume-unchanged <file>

(if you have a better solution feel free to share...)