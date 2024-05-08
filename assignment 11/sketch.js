let port;

let connectButton;


let redButton;
let greenButton;
let blueButton;


function setup() {
  port = createSerial();
  createCanvas(600, 600);
  
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  redButton = createButton("Red");
  greenButton = createButton("Green");
  blueButton =createButton("Blue");
  
  
  frameRate(90);
}

function draw() {
  

  background(255);
  

  let str;
  str = port.readUntil('\n');
  fill( 245, (Number(str)%255), 66);
  rect(0,0,600,600);
 

    if(port.opened() ){
      redButton.mousePressed(()=>{port.write("255 0 0\n");});
      greenButton.mousePressed(()=>{ port.write("0 255 0\n");});
      blueButton.mousePressed(()=>{port.write("0 0 255\n");});
      
    }

}

function connect(){
  if(!port.opened()){
    port.open('Arduino', 9600);
  }else{
    port.close();
  }
}