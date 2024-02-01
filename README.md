# Botgpt

A chatgpt integrated voice bot that answers to user queries in real time just listening to it. 

Built using Nodejs, Express, Socket.io and openi API.

Speech to text and text to speech conversion using browsers SpeechRecogintion functionality.

# Instructions to run

1. Clone the repo and 
    cd Voice Bot

2. Install dependencies 
    npm i

3. Create a .env file with structure like below
    PORT=<PORT>
    OPENAI_API_KEY=<Your API Key>

    OPENAI_API_KEY is being used in the

4. Run the server 
    npm start or nodemon app.js

5. Open localhost:<PORT> in the browser