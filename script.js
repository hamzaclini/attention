let playerState = 'idle';
let stateIndex = 0;
const dropdown = document.getElementById('animations');
let states = ['idle', 'jump', 'fall', 'run', 'dizzy', 'sit', 'roll', 'bit', 'ko', 'gethit'] 
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
    stateIndex = states.indexOf(playerState);
})
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');


const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
//let frameY = 0;
let maxFrameY = [6, 6, 6, 8, 10, 4, 6, 6, 11, 3];


console.log(playerState);
let gameFrame = 3; // control the speed of frames
let countFrame = 0;


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

animate();

