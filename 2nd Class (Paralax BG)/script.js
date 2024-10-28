const canvas = document.getElementById('canvas1'); //Genero una variable ligada al canvas del HTML
const ctx = canvas.getContext('2d'); //Le paso la información a la variable ctx (context)
const CANVAS_WIDTH = canvas.width = 800; //Determino las medidas del canvas como variables globales
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5; //Variable que controla la velocidad del fondo

const backgroundLayer1 = new Image(); //Genera un objeto de tipo imagen
backgroundLayer1.src = 'img/layer-1.png' //Asigna la imagen al objeto
const backgroundLayer2 = new Image(); //Lo mismo con las otras 5 imagenes
backgroundLayer2.src = 'img/layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/layer-5.png'

window.addEventListener('load', function(){ //Espero a que la pantalla cargue para ejecutar el código (Pensado para web)
    const slider = document.getElementById('slider'); //Vinculo una variable al slider del HTML
    slider.value = gameSpeed;  // Seteo el slider a la velocidad hardcodeada
    const showGameSpeed = document.getElementById('showGameSpeed'); //Lo mismo que el slider pero para modificar el número visible por el usuario
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e){ //Agrego un Listener para cuando el usuario modifique el slider cambie el valor interno del gameSpeed
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    });

    class Layer{
        constructor(image, speedModifier){ //"Prototipa" el objeto, es como el struct del C++
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){ //Lo utilizo para resetear el x cuando se vaya del límite y para modificar la posición del fondo
            this.speed = gameSpeed * this.speedModifier;
            if(this.x <= -this.width){
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }
        draw(){ //Mueve el fondo y el duplicado
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }

    const layer1 = new Layer(backgroundLayer1, .2); //Creo cada capa del fondo utilizando el prototipado y asignando una "aceleración" para c/u
    const layer2 = new Layer(backgroundLayer2, .4);
    const layer3 = new Layer(backgroundLayer3, .6);
    const layer4 = new Layer(backgroundLayer4, .8);
    const layer5 = new Layer(backgroundLayer5, 1);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5]; //Añado todo el fondo a un array para no tener 'spaguetti code'

    function animate(){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT) // Limpio el canvas, evito superposición de imagenes
        gameObjects.forEach(object =>{ //Para cada elemento del array...
            object.update(); // Actualizo posición
            object.draw(); // Muevo
        })
        requestAnimationFrame(animate); //Bucle
    };

    animate(); //Llamo a la función para que comience a loopear

});