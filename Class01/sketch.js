function setup() { //creates the canvas set up- first create page initially
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100); //sets the color mode
  //hue, saturation, brightness
  angleMode(DEGREES); //set it to degree mode
}

function draw() { //draw things into sketch
  background(220);
  noStroke();// gets rid of the black outlines
  fill('black');
  circle(150, 150, 100); //x, y, diamter 
  fill(280, 90, 40);
  circle(150, 150, 50);

  stroke(0); //specifies the color of the lines
  strokeWeight(5); //specifies weight in pixels 
  line(200, 200, 400, 400) //x, y coordinates- end points


  stroke(0); 
  strokeWeight(2); 
  fill(0, 100, 50, 0.5); //specify an alpha for transulance (0-1)
  //noFill(); //it will not have a fill
  //arc(300, 300, 200, 200,0, PI); //center point, width, height, start(rad), end (rad) 
  arc(300, 300, 200, 200,-45, 90, PIE); 
  //part of an elipse 

  beginShape();
  vertex(450, 200); //specify a specific point 
  vertex(500, 50);
  vertex(550,200);
  vertex(500,350);
  endShape(CLOSE);


}
