let synth = new Tone.PolySynth(Tone.Synth);
//let synth = new Tone.PolySynth(Tone.MedalSynth);
//let synth = new Tone.PolySynth(Tone.MembraneSynth);

let bend = new Tone.PitchShift();
bend.pitch = 0;
synth.connect(bend);
bend.toDestination();


let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

function setup(){
  createCanvas(400,400);
  pitchSlider = createSlider(0,12,0,0.1);
  pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());
}

function keyPressed(){
  let playNotes = notes(key);
  synth.triggerAttack(playNotes, 0.2);
}

function keyReleased(){
  let playNotes = notes(key);
  synth.triggerReleased(playNotes, '+0.03');
}
function draw(){
  background(220);
  text('play A-K', 100, 200);
}