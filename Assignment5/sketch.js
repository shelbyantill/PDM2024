
let sounds = new Tone.Players({
  splash : "assets/splash.mp3",
  mouse: "assets/mouse.mp3",
  car : "assets/car.mp3",
  explosion: "assets/explosion.mp3"
}).toDestination();;


let delAmt = new Tone.FeedbackDelay("8m", 0.5);

let button1, button2, button3, button4;

let delaySlider;


sounds.connect(delAmt);
delAmt.toDestination();


function setup(){
  createCanvas(400,400);

  button1 = createButton('Mouse Button');
  button1.position(85, 150);
  button1.mousePressed(()=> sounds.player('mouse').start());


  button2 = createButton('Splash Button');
  button2.position(200, 150);
  button2.mousePressed(()=> sounds.player('splash').start());


  button3 = createButton('Car Button');
  button3.position(85, 200);
  button3.mousePressed(()=> sounds.player('car').start());


  button4 = createButton('Explosion Button');
  button4.position(200, 200);
  button4.mousePressed(()=> sounds.player('explosion').start());

  delaySlider = createSlider(0,1,0,0.05);
  delaySlider.position(120, 250);
  delaySlider.mouseMoved(()=> delAmt.delayTime.value = delaySlider.value())


}


function draw(){
  background(220, 100, 50);
  text("delay slider", 150,280);
  
}