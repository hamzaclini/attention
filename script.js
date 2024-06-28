let spelledWord;
let mediaRecorder;
let playerState = 'idle';
let stateIndex = 0;
let states = ['idle', 'jump', 'fall', 'run', 'dizzy', 'sit', 'roll', 'bite', 'ko', 'gethit'];
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let gameFrame = 3; // control the speed of frames
let countFrame = 0;
const playerImage = new Image();
let frameX = 0;
const spriteWidth = 575;
const spriteHeight = 523;
let maxFrameY = [6, 6, 6, 8, 10, 4, 6, 6, 11, 3];

function start_recording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
  
      socket = new WebSocket("wss://api.deepgram.com/v1/listen", ["token", "dbe9ccbb4608e6c5e8b1baed8880d0627480af28"]);
  
  
      socket.onopen = () => {
        mediaRecorder.addEventListener("dataavailable", (event) => {
          socket.send(event.data);
        });
        mediaRecorder.start(250);
      };
  
      socket.onmessage = (message) => {
        
        playerImage.src = 'shadow_dog.png';

        
        //let frameY = 0;
        
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        console.log(transcript)
        //console.log(transcript);
        spelledWord = transcript.split(" ")[0]; // we consider the first word
        if (states.includes(spelledWord)) {
            console.log(states.indexOf(spelledWord));
            stateIndex =  states.indexOf(spelledWord);
          //console.log("empty");
        } 
      };
  
      socket.onerror = (error) => {
        //console.error("WebSocket error:", error);
      };
    });
  }

//const dropdown = document.getElementById('animations');

//const talkBut = document.getElementById('talk');
//talkBut.addEventListener('click', function(){
//    playerState = start_recording();
//})
//dropdown.addEventListener('change', function(e){
//    playerState = e.target.value;
//    stateIndex = states.indexOf(playerState);
//})




function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(50, 50, 100, 100);
    //ctx.drawImage(playerImage, sx, sy, sw, sh, 50, 50, CANVAS_WIDTH, CANVAS_HEIGHT); s: source
    ctx.drawImage(playerImage, frameX * spriteWidth, stateIndex * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight );
    if(countFrame >= gameFrame){
        if(frameX < maxFrameY[stateIndex]) frameX++;
        else frameX = 0;
        countFrame = 0;

    }
    countFrame++;
    

    requestAnimationFrame(animate);
};


start_recording();
animate();





