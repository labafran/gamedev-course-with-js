let playerState = 'idle'; //Hardcodeo la animación idle para que esté como default
const dropdown = document.getElementById('animations'); //Vinculo una variable al selector del usuario
dropdown.addEventListener('change', function(e){ //Añado un Listener para modificar las animaciones desde el HTML
    playerState = e.target.value; //Modifico la animación dependiendo lo seleccionado
})


const canvas = document.getElementById("canvas1"); //Genero una variable ligada al canvas del HTML 
const ctx = canvas.getContext("2d"); //Le paso la información a la variable ctx (context)
const CANVAS_WIDTH = (canvas.width = 600); //Determino las medidas del canvas como variables globales
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image(); //Genera un objeto de tipo imagen
playerImage.src = "img/player.png"; //Asigna la imagen al objeto
const spriteWidth = 575; //Asigno las dimensiones del sprite
const spriteHeight = 523;

let gameFrame = 0; //Contador de frames
const staggerFrames = 4; //Velocidad a la que cambia de frames (a mayor número, más rápido)
const spriteAnimations =[]; //Array que contendrá las posiciónes de cada frame por cada animación
const animationStates = [ //Array que contiene el nombre y cantidad de frames por animación
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'damage',
        frames: 4,
    }
];
animationStates.forEach((state, index)=> { //Recorro el array de las animaciones
    let frames = {
        loc: [],
    }
    for(let j=0;j<state.frames;j++){ //Leo la posición de cada frame
        let positionX=j*spriteWidth;
        let positionY=index*spriteHeight;
        frames.loc.push({x: positionX, y: positionY}) 
    }
    spriteAnimations[state.name] = frames; //Agrego la posición al array de posiciones
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH); //Limpio el canva para evitar superposición de imágenes
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; //Calculo en que posición de la animación está
  let frameX = spriteWidth*position; //Agrego el valor actual a una variable
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight); //Dibujo el frame
  gameFrame++; //Contador de frames se incrementa
  requestAnimationFrame(animate); // Loop
}
animate();