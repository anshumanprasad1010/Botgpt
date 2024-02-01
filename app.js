const express = require("express");
require("dotenv").config();
const socketio = require("socket.io");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) ;

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
        const gptResponse = await openai.chat.completions.create({
          messages: [{ role: "system", content: query }],
          model: "gpt-3.5-turbo",
        });
      
        
        const { choices } = gptResponse;
        const result = choices[0].message.content;
      
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

