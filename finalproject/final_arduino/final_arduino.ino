#define VRX_PIN A0
#define VRY_PIN A1
#define SW_PIN 2

const int redPin = 11;
const int greenPin = 10;
const int bluePin = 9;

int joyX = 0, joyY = 0, sw = 0;


const int numReadings = 10;

int xreadings[numReadings];  
int yreadings[numReadings]; 
int readIndex = 0;          
int xTotal = 0;  
int yTotal = 0;              
float xAverage = 0;  
float yAverage = 0;  
float xStart, yStart;
bool start = false;
unsigned long lastTime=0;
const int interval = 16;

void setup() {
  Serial.begin(57600); //bits per second
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  pinMode(SW_PIN, INPUT_PULLUP);

  for(int i = 0; i <numReadings; i++){
    xreadings[i]=0;
    yreadings[i]=0;
  }
}

void loop() {
  
while (Serial.available() > 0) {
    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
    }
  }
  int x = analogRead(VRX_PIN);
  int y = analogRead(VRY_PIN);
  int sw = digitalRead(SW_PIN);

  xTotal = xTotal - xreadings[readIndex];
  yTotal = yTotal - yreadings[readIndex];

  xreadings[readIndex] = x;
  yreadings[readIndex] = y;
  
  xTotal = xTotal + x;
  yTotal = yTotal + y;
  
  readIndex = readIndex + 1;

  xAverage = xTotal / numReadings;
  yAverage = yTotal / numReadings;
  
  if (readIndex >= numReadings) {
    readIndex = 0;
    if(!start){
      xStart = xAverage;
      yStart = yAverage;
      start = true;
    }
    
  }

  
  
  if(start){
    unsigned long now = millis();

    if(now - lastTime > interval){
       Serial.print((int)(xAverage- xStart));
      Serial.print(",");
      Serial.print((int)(yAverage- yStart));
      Serial.print(",");
      Serial.println(!sw);
      lastTime = now;
    }
   

  }
  
 
}