
let synth = new Tone.Synth({
  oscillator: {
    type: "sine"
  }, 
  envelope: {
    attack: 0.01 + Math.random() * 0.1, 
    decay: 0.05 + Math.random() * 0.05,  
    sustain: 0,  
    release: 0.1 + Math.random() * 0.2 
  }
}).toDestination();


const filter = new Tone.Filter({
  type: "bandpass",
  frequency: 300, 
  Q: 80 
}).toDestination();

synth.connect(filter);

let LFO = new Tone.LFO({
  frequency: 2 + Math.random() * 4, 
  min: 0,
  max: 5, 
}).start();

LFO.connect(synth.oscillator.frequency);

let image;

function preload() {
  image = loadImage("assets/basketball.jpeg");
}

function playSound() {
  synth.triggerAttackRelease( "C5", 1); 
}

function mousePressed() {
  playSound();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed) {
    background(image);
  } else {
    background(240);
    text("Press the mouse button to dribble the ball", 100, height / 3);
  }
}

