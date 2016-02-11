int buttonPin = 7;
int redLedPin =  13;
int yellowLedPin =  12;
int greenLedPin =  11;
int buttonState = 0;
int prevButtonState = 0;
int ledId = 0;

// the setup function runs once when you press reset or power the board
void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(redLedPin, OUTPUT);
  pinMode(yellowLedPin, OUTPUT);
  pinMode(greenLedPin, OUTPUT);
  
  Serial.begin(9600);
}

// the loop function runs over and over again forever
void loop() {
  buttonState = digitalRead(buttonPin);
  
  if (buttonState != prevButtonState && buttonState == HIGH) {
    if (ledId == 2) {
      ledId = 0;
    }
    else {
      ledId++; 
    }
    
    digitalWrite(redLedPin, LOW);
    digitalWrite(yellowLedPin, LOW);
    digitalWrite(greenLedPin, LOW);
    Serial.println(buttonState);
    if (ledId == 0) {
      digitalWrite(greenLedPin, HIGH);
    }
    if (ledId == 1) {
      digitalWrite(yellowLedPin, HIGH);
    }
    if (ledId == 2) {
      digitalWrite(redLedPin, HIGH);
    }
    delay(200);
  }
  prevButtonState == buttonState;
  
//  digitalWrite(redLedPin, LOW);
//  digitalWrite(greenLedPin, LOW);
//  if (buttonState == HIGH) {
//    digitalWrite(redLedPin, HIGH);
//  }
//  else {
//    digitalWrite(greenLedPin, HIGH);
//  }
  
  
}
