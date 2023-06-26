const btn = document.querySelector("button");
const outputme = document.querySelector(".output-you");
const outputbot = document.querySelector(".output-bot");
const socket = io();

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;

//After button is clicked, voice recognition starts
btn.addEventListener("click", () => {
  recognition.start();
});

//User voice input displayed and sent to backend in text form
recognition.onresult = function (event) {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;
  console.log(text);

  outputme.textContent = text;

  socket.emit("chat message", text);
};

//Function to output the text response into audio form 
const botReply = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.pitch = 1;
  utterance.volume = 1;
  synth.speak(utterance);
};

//Display and process the text response from backend
socket.on("bot reply", (text) => {
  outputbot.textContent = text;
  botReply(text);
});