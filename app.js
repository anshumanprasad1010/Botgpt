const express = require("express");
require("dotenv").config();
const socketio = require("socket.io");
const { Configuration, OpenAIApi } = require("openai");

const app = express();


app.use(express.static("views"));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

//Establishing connection through socket 
const server = app.listen(
    PORT,
    console.log(
      `Server is runnig on port ${PORT}`
    )
  );

const io = socketio(server);

io.on("connection", function (socket) {
  console.log("a user connected");

  //Processing the text request of user through openai API
  socket.on("chat message", (message) => {
    console.log(message);

    const callapibot = async (query) => {
      try {
        const configuration = new Configuration({
            apiKey: process.env.API_KEY,     
          });
        const openai = new OpenAIApi(configuration); 
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: query,
            max_tokens: 100,
            temperature: 0,
            n:1,
            stop: "/n"
        });
        
        const { choices } = gptResponse.data;
        const result = choices[0].text.trim();
      
        //Processed response sent back to user
        socket.emit("bot reply", result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    callapibot(message);
  });
});

