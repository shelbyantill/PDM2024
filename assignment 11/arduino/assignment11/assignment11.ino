const int analogInPin1 = A0;


const int redPin = 9;
const int greenPin = 10;
const int bluePin = 11;
unsigned long lastTime=0;
const int interval = 13;

void setup() {
  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
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

  
  int sensorValue1 = analogRead(analogInPin1);
  unsigned long now = millis();
  if (now - lastTime > interval) {
    Serial.println(sensorValue1);
    lastTime = now;
  }
}
