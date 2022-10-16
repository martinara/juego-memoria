//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let tiempoRegresivoId = null;

//Iniviclizacion variables de audio
let winAudio = new Audio('./assets/sounds/win.wav');
let loseAudio = new Audio('./assets/sounds/lose.wav');
let clickAudio = new Audio('./assets/sounds/click.wav');
let wrongAudio = new Audio('./assets/sounds/wrong.wav');
let rightAudio = new Audio('./assets/sounds/right.wav');

//Apuntando a doc HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

//Funciones
function contarTiempo(){
  tiempoRegresivoId = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer==0){
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
    }
  },1000);
}

function bloquearTarjetas(){
  for(let i = 0; i<=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./assets/img/${numbers[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

//Funcion princial
function destapar(id) {

  if(temporizador==false){
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if(tarjetasDestapadas==1){
    //Mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numbers[id];
    tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png" alt="">`;
    clickAudio.play();

    //Deshabilitar primera tarjeta
    tarjeta1.disabled = true;
  }else if(tarjetasDestapadas==2){
    //Mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numbers[id];
    tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png" alt="">`;

    //Deshabilitar segunda tarjeta
    tarjeta2.disabled = true;

    //Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado==segundoResultado){
      //Resetear tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if(aciertos==8){
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😃🎉`;
      }

    }else{
      wrongAudio.play();
      //Mostrar momentaneamente los valores y volver a tapar
      setTimeout(()=>{
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },800)
    }
  }
}