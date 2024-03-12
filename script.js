const timerElement = document.getElementById('timer');
const label = document.getElementById("output");
const say = document.getElementById("say");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const box = document.getElementById("textbox");

let letter;
let correctWords = [];
let wrongWords = [];
let repeatedWords = [];
let mediaRecorder;
let socket;
let working = false;
let consider;
let already;
let timerInterval;

function check_word() {
  for (let i = 0; i < correctWords.length; i++) {
    if (correctWords[i] === consider) {
      return true;
    }
  }
  return false;
}

function getUniqueWords(words) {
  const uniqueWordsSet = new Set(words);
  const uniqueWordsArray = Array.from(uniqueWordsSet);
  return uniqueWordsArray;
}

startBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerElement.textContent = '120 seconds'
  experimentStartTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  letter = box.value;

  if (/^[a-zA-Z]$/.test(letter)) {
    letter = letter.toLowerCase();
    if (working === false) {
      box.disabled = true;
      startBtn.innerHTML = "Stop";
      say.textContent = "Tu as dit:";
      start_recording();
      working = true;
    } else {
      clearInterval(timerInterval);
      console.log(correctWords);
      repeatedWords = getUniqueWords(repeatedWords);
      save_csv()
      label.textContent = "";
      say.textContent = "Merci pour avoir participé à ce test";
      box.disabled = false;
      working = false;
      startBtn.innerHTML = "Re-commence";
      stop_recording();
    }
  } else {
    alert("Il faut entrer un lettre!");
  }
});

function start_recording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?language=fr&tier=enhanced&model=general&version=beta",
      ["token", "dbe9ccbb4608e6c5e8b1baed8880d0627480af28"]
    );

    //wss://api.deepgram.com/v1/listen
    //wss://api.deepgram.com/v1/listen?language=fr-FR

    socket.onopen = () => {
      mediaRecorder.addEventListener("dataavailable", (event) => {
        socket.send(event.data);
      });
      mediaRecorder.start(250);
    };

    socket.onmessage = (message) => {
      const received = JSON.parse(message.data);
      const transcript = received.channel.alternatives[0].transcript;
      //console.log(transcript);
      consider = transcript.split(" ")[0];
      if (consider === "") {
        //console.log("empty");
      } else {
        wordLetters = consider.split("");
        if (wordLetters[0] === letter) {
          already = check_word();
          console.log(already);
          if (already) {
            label.classList.remove("wrong");
            label.classList.remove("right");
            label.classList.add("repeated");
            repeatedWords.push(consider);
          } else {
            correctWords.push(consider);
            label.classList.remove("repeated");
            label.classList.remove("wrong");
            label.classList.add("right");
          }

          //console.log("right");
        } else {
          wrongWords.push(consider);
          label.classList.remove("repeated");
          label.classList.remove("right");
          label.classList.add("wrong");
          //console.log("wrong");
        }
        label.textContent = "\t" + consider;
        //console.log(wordLetters);
      }
    };

    socket.onerror = (error) => {
      //console.error("WebSocket error:", error);
    };
  });
}

function stop_recording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  // if (
  //   socket &&
  //   (socket.readyState === WebSocket.OPEN ||
  //     socket.readyState === WebSocket.CONNECTING)
  // ) {
  //   socket.close();
  // }
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedSeconds = Math.floor((currentTime - experimentStartTime) / 1000);
  let remainingSeconds = 120 - elapsedSeconds;
  
  if (remainingSeconds <= 0) {
      clearInterval(timerInterval); 
      if(remainingSeconds === 0){
      console.log(correctWords);
      repeatedWords = getUniqueWords(repeatedWords);
      save_csv()
      label.textContent = "";
      say.textContent = "Merci pour avoir participé à ce test";
      box.disabled = false;
      working = false;
      startBtn.innerHTML = "Re-commence";
      stop_recording();
      }
  }

  if (remainingSeconds <= 10) {
      timerElement.style.color = 'red'; 
  }
  
  timerElement.textContent =  remainingSeconds + ' seconds';
  console.log(remainingSeconds);
}

function save_csv(){
  correctWords.unshift("Correcte");
  repeatedWords.unshift("Doublons");
  wrongWords.unshift("Erreur");
  const data = [correctWords, repeatedWords, wrongWords];
  function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  }
  const transposedData = transpose(data);
  const csvData = transposedData.map(row => row.join(';')).join('\n');
  const utf8BOM = "\uFEFF";
  const csvDataUTF8 = utf8BOM + csvData;
  const blob = new Blob([csvDataUTF8], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emotion_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  //window.close(); 
}
