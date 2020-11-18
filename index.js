// const list = document.querySelector("#list");
// const sentence = document.querySelector("#sentence");


const app = new Vue({
  el: "#app",

  data: {
    msg: "",
    todos: [],
  },
});

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// setup speech recognition
const recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.lang = "en-US";

// does browser hear someone speaking? record it.
recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript;

  // does browser detect a sentence has now stopped?
  if (event.results[0].isFinal) {
    app.msg = `I heard - ${transcript}`;
    // check if input starts with 'new'
    if (transcript.indexOf("add") === 0) {
      const todo = transcript.substring(3);
      app.todos.push(todo);
      console.log(app.todos);
    }
    if (transcript.indexOf("remove") === 0) {
      const todo = transcript.substring(6);
      const removed = app.todos.filter(function(todos){
        return todos !== todo
      });
      app.todos = removed;
    }
  }
});

recognition.addEventListener("end", recognition.start);
recognition.start();