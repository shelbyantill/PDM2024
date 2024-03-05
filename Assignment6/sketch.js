const synth = new Tone.MembraneSynth(Tone.Synth);
const bend = new Tone.PitchShift(); // adding pitch shifting
bend.pitch = 0;
synth.connect(bend);
bend.toDestination();
//connecting synth to effect to destination

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'f4',
  'g': 'g4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);
  
  pitchSlider = createSlider(0, 12, .1, .5);
  pitchSlider.position (120,200);
  pitchSlider.mouseMoved(() => {
    bend.pitch = pitchSlider.value();
  })
 // mouseMoved is so the bend works while mouse is moving
}

function draw() {
  background(250, 30, 200);
  text("Play A through K and bend pitch with slider.", 75, 150)
}



function keyPressed() {
  let playNotes = notes[key]; // assign notes variable to keys when played
  synth.triggerAttack(playNotes);
// separated attack and release so keyboard press controls this
}

function keyReleased() {
  let playNotes = notes[key]; // assign notes variable to keys when played
  synth.triggerRelease(playNotes, '+0.03'); 
  // added time to release to reduce popping sound
}