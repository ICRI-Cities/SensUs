/*
by Sarah Gallacher
 */
#include <Wire.h>
#include <SPI.h>
#include <WiFi.h>
#include <Adafruit_NeoPixel.h>
#include <Adafruit_NFCShield_I2C.h>

/****************************************************
*  GLOBAL VARIABLES
****************************************************/
//box variable
const String boxID = "5";

//WiFi variables
char ssid[] = "CS66GS";      //  your network SSID (name) 
char pass[] = "WIRELESS_PETE";   // your network password
int status = WL_IDLE_STATUS;

//server variables
WiFiClient client;
char server[] = "icri-nodejs.cs.ucl.ac.uk";
int port = 6543;
boolean lastConnected = false;                  // state of the connection last time through the main loop

//card reader
#define IRQ   (2)
#define RESET (3)  // Not connected by default on the NFC Shield
Adafruit_NFCShield_I2C nfc(IRQ, RESET);
uint8_t success;
String cardID;
long lastScan = 0;

//button pins
int yesNoButtons1[] = {31,23};
int yesNoButtons2[] = {33,25};
int yesNoButtons3[] = {35,27};
int yesNoButtons4[] = {37,29};
int checkButtons1[] = {A10,5,A2};
int checkButtons2[] = {A13,6,A3};
int checkButtons3[] = {A14,A0,A4};
int checkButtons4[] = {A15,A1,A5};
int checkButtons1State[] = {0,0,0};
int checkButtons2State[] = {0,0,0};
int checkButtons3State[] = {0,0,0};
int checkButtons4State[] = {0,0,0};

//toggle pins
int toggle1[] = {42,44};
int toggle2[] = {38,40};
int toggle3[] = {34,36};

//led pins
int yesNoLEDs1[] = {45,53};
int yesNoLEDs2[] = {43,24};
int yesNoLEDs3[] = {41,49};
int yesNoLEDs4[] = {39,47};
int startLED = 48;
int finishLED = 22;

//LED strip
int ledStrip = 46;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(29, ledStrip, NEO_GRB + NEO_KHZ800);
int sliderLEDs[] = {21,22,23,24,25,26,27,28};
int toggle1LEDs[] = {12,13,14};
int toggle2LEDs[] = {15,16,17};
int toggle3LEDs[] = {18,19,20};

int checkLEDs1[] = {8,7,0};
int checkLEDs2[] = {9,6,1};
int checkLEDs3[] = {10,5,2};
int checkLEDs4[] = {11,4,3};

//slider pins
int sliderPin = A12;

//pot pins
int potPin = A11;

//results
const int resultsLength = 23;
String results[resultsLength];

//answers
String yesNoAnswers[] = {"yes", "no"};
String toggleAnswers[] = {"yes","pnts","no"};
String giftAnswers[] = {"throw away","store","friends or family","charity","sell","other","pnts"};
String mostFaithAnswers[] = {"myself","friends or family","local councillor","government","UN","universe","other","pnts"};

//flags
boolean inProgress = false;
boolean gotData = false;
boolean firstRegister = true;
boolean startOn = false;

long flashDelay = 400;
long lastFlash = 0;
long lastButtonPress = 0;


/****************************************************
*  SETUP
****************************************************/
void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(115200); 
  
  //initialise WIRE
  Wire.begin();
  
  //initialise NFC
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  //set for 2 tries before moving on
  nfc.setPassiveActivationRetries(0x02);
  // configure board to read RFID tags
  nfc.SAMConfig();
  //initialise success
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  //setup buttons and LEDs
  for(int i=0; i<2; i++){
    pinMode(yesNoButtons1[i], INPUT);
    pinMode(yesNoButtons2[i], INPUT);
    pinMode(yesNoButtons3[i], INPUT);
    pinMode(yesNoButtons4[i], INPUT);
    pinMode(yesNoLEDs1[i], OUTPUT); digitalWrite(yesNoLEDs1[i], LOW);
    pinMode(yesNoLEDs2[i], OUTPUT); digitalWrite(yesNoLEDs2[i], LOW);
    pinMode(yesNoLEDs3[i], OUTPUT); digitalWrite(yesNoLEDs3[i], LOW);
    pinMode(yesNoLEDs4[i], OUTPUT); digitalWrite(yesNoLEDs4[i], LOW);
  }
  for(int i=0; i<3; i++){
    pinMode(checkButtons1[i], INPUT); checkButtons1State[i] = 0;
    pinMode(checkButtons2[i], INPUT); checkButtons2State[i] = 0;
    pinMode(checkButtons3[i], INPUT); checkButtons3State[i] = 0;
    pinMode(checkButtons4[i], INPUT); checkButtons4State[i] = 0;
  }
  for(int i=0; i<2; i++){
    pinMode(toggle1[i], INPUT);
    pinMode(toggle2[i], INPUT);
    pinMode(toggle3[i], INPUT);
  }
  pinMode(startLED, OUTPUT); digitalWrite(startLED, LOW);
  pinMode(finishLED, OUTPUT); digitalWrite(finishLED, LOW);
  
  //setup slider
  pinMode(sliderPin, INPUT);
  
  //setup potentiometer
  pinMode(potPin, INPUT);
  
  //initialise LED strip
  strip.begin();
  for(int i=0; i<strip.numPixels(); i++){
    strip.setPixelColor(i, strip.Color(0,0,0));
  }
  strip.show();
  
  //initialise results array
  resetResults();
  
  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present"); 
    // don't continue:
    while(true);
  } 
  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:    
    status = WiFi.begin(ssid,pass);

    // wait 10 seconds for connection:
    delay(10000);
  } 
  // you're connected now, so print out the status:
  printWifiStatus();
  
  //set LCD screen text
  Wire.beginTransmission(111);
  Wire.write(0);  //show INSERT CARD message
  Wire.endTransmission();
}


/****************************************************
*  LOOP
****************************************************/
void loop() {
  // if there's incoming data from the net connection.
  // send it out the serial port.  This is for debugging
  // purposes only:
  //while (client.available()) {
    //char c = client.read();
    //Serial.write(c);
  //}
  
  // if there's no net connection, but there was one last time
  // through the loop, then stop the client:
  //boolean prevConnected = client.connected();
  //if (!client.connected() && lastConnected) {
    //Serial.println("disconnecting.");
    //client.flush();
    //client.stop();
  //}
  //lastConnected = client.connected();
  
  //Check for NFC card
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  if((millis() - lastScan) > 1000){                          
    success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
    lastScan = millis();
  }
  
  //wait for card to be inserted - flash start LEDs
  if(!success){  //NO CARD INSERTED YET
    deactivateBox();
    firstRegister = true;
    
    if(startOn){  //toggle start LEDs off
        if(millis() - lastFlash > flashDelay){
          digitalWrite(startLED, LOW);
          startOn = false;
          lastFlash = millis();
        }
      }else{
        if(millis() - lastFlash > flashDelay){  //toggle start LEDs on
          digitalWrite(startLED, HIGH);
          startOn = true;
          lastFlash = millis();
        }
      }  
    }else{ //card inserted
      if(firstRegister){  //if first time registered - activate box
        activateBox();
        firstRegister = false;
        gotData = true;
        
        //process card ID
        String cardID = "";
        for (uint8_t i=0; i < uidLength; i++){ 
          cardID = String(cardID + uid[i]);
        }
        results[1] = cardID;
        Serial.print("card ID = ");
        Serial.println(cardID);
      }
      
      //check slider
      int sliderVal = analogRead(sliderPin);
      turnOnSliderLED(sliderVal);
      
      //check checkButtons
      for(int i=0; i<3; i++){
        if(digitalRead(checkButtons1[i]) == LOW){  //pressed
          if(millis() - lastButtonPress > 500){
            handleCheckButtons1(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(checkButtons2[i]) == LOW){  //pressed
          if(millis() - lastButtonPress > 500){
            handleCheckButtons2(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(checkButtons3[i]) == LOW){  //pressed
          if(millis() - lastButtonPress > 500){
            handleCheckButtons3(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(checkButtons4[i]) == LOW){
          if(millis() - lastButtonPress > 500){
            handleCheckButtons4(i);
            lastButtonPress = millis();
          }
        }
      }
      
      //check public transport
      int val = analogRead(potPin);
      if(val <= 98){
        results[15] = giftAnswers[6];
      }else if(val > 98 && val <= 217){
       results[15] = giftAnswers[5];
      }else if(val > 217 && val <= 348){
       results[15] = giftAnswers[4];
      }else if(val > 348 && val <= 657){
       results[15] = giftAnswers[3];
      }else if(val > 657 && val <= 800){
       results[15] = giftAnswers[2];
      }else if(val > 800 && val <= 894){
       results[15] = giftAnswers[1];
      }else{ //val > 894 
        results[15] = giftAnswers[0];
      }
      
      //check toggles
      if(digitalRead(toggle1[0]) == LOW){  //selected
        turnOnToggle1LED(0);
        results[16] = toggleAnswers[0];
      }else if(digitalRead(toggle1[1]) == LOW){
        turnOnToggle1LED(2);
        results[16] = toggleAnswers[2];
      }else{
        turnOnToggle1LED(1);
        results[16] = toggleAnswers[1];
      }
      
      if(digitalRead(toggle2[0]) == LOW){
        turnOnToggle2LED(0);
        results[17] = toggleAnswers[0];
      }else if(digitalRead(toggle2[1]) == LOW){
        turnOnToggle2LED(2);
        results[17] = toggleAnswers[2];
      }else{
        turnOnToggle2LED(1);
        results[17] = toggleAnswers[1];
      }
      
      if(digitalRead(toggle3[0]) == LOW){
        turnOnToggle3LED(0);
        results[18] = toggleAnswers[0];
      }else if(digitalRead(toggle3[1]) == LOW){
        turnOnToggle3LED(2);
        results[18] = toggleAnswers[2];
      }else{
        turnOnToggle3LED(1);
        results[18] = toggleAnswers[1];
      }
      
      //check yesNoButtons
      for(int i=0; i<2; i++){
        if(digitalRead(yesNoButtons1[i]) == LOW){  //pressed
          if(millis() - lastButtonPress > 500){
            results[19] = yesNoAnswers[i];
            turnOnYesNoLEDs1(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(yesNoButtons2[i]) == LOW){
          if(millis() - lastButtonPress > 500){
            results[20] = yesNoAnswers[i];
            turnOnYesNoLEDs2(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(yesNoButtons3[i]) == LOW){
          if(millis() - lastButtonPress > 500){
            results[21] = yesNoAnswers[i];
            turnOnYesNoLEDs3(i);
            lastButtonPress = millis();
          }
        }
        if(digitalRead(yesNoButtons4[i]) == LOW){
          if(millis() - lastButtonPress > 500){
            results[22] = yesNoAnswers[i];
            turnOnYesNoLEDs4(i);
            lastButtonPress = millis();
          }
        }     
      }
    }
}


/****************************************************
*  HELPER METHODS
****************************************************/

// this method makes a HTTP connection to the server:
void uploadResults() {
  String postData = "";
  for(int i=0; i<resultsLength; i++){  //add results
    postData = postData+results[i];
    if(i!=resultsLength-1){
      postData = postData+",";
    }
  }
  Serial.println(postData);
  
  while(status != WL_CONNECTED){
    Serial.println("Reconnecting to wifi...");
    status = WiFi.begin(ssid,pass);
    delay(5000);
  }
  
  // if there's a successful connection:
  Serial.println("connecting...");
  if (client.connect(server, port)) {
    Serial.println("sending...");
    // send the HTTP POST request:
    client.println("POST /censusUpdate.html HTTP/1.0");
    client.println("Host: icri-nodejs.cs.ucl.ac.uk");
    client.println("User-Agent: Arduino/1.0");
    client.println("Connection: close");
    client.println("Content-Type: text/html");
    client.print("Content-Length: ");
    client.println(postData.length());
    client.println();
    client.println(postData);
    delay(1000);
  } 
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
    Serial.println("disconnecting.");
    client.stop();
  }
  
  delay(1000);
  
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }
  
  Serial.println("disconnecting...");
  client.flush();
  client.stop();
}

void deactivateBox(){
  //upload data if any
  if(gotData){
    //set LCD screen text
    Wire.beginTransmission(111);
    Wire.write(3);  //show BOX STOPPING message
    Wire.endTransmission();
     uploadResults();
     resetResults();
     gotData = false;
    //set LCD screen text
    Wire.beginTransmission(111);
    Wire.write(0);  //show INSERT CARD message
    Wire.endTransmission();
  }
  
  //turn off leds
  for(int i=0; i<2; i++){
    digitalWrite(yesNoLEDs1[i], LOW);
    digitalWrite(yesNoLEDs2[i], LOW);
    digitalWrite(yesNoLEDs3[i], LOW);
    digitalWrite(yesNoLEDs4[i], LOW);
  }
  digitalWrite(finishLED, LOW); 
  
  //turn off LED strip
  for(int i=0; i<strip.numPixels(); i++){
    strip.setPixelColor(i, strip.Color(0,0,0));
  }
  strip.show();
}

void activateBox(){
  //turn on start LEDs
  digitalWrite(startLED, HIGH);
  
  //turn on finish LEDs
  digitalWrite(finishLED, HIGH);
  
  //set LCD screen text
  Wire.beginTransmission(111);
  Wire.write(1);  //show BOX ACTIVE message
  Wire.endTransmission();
}

void resetResults(){
  results[0] = boxID;
  for(int i=1; i<3; i++){
    results[i] = "-1";
  }
  for(int i=3; i<15; i++){
    results[i] = yesNoAnswers[1];
  }
  for(int i=15; i<resultsLength; i++){
    results[i] = "-1";
  }
  
  //reset checkbutton states too
  for(int i=0; i<3; i++){
    checkButtons1State[i] = 0;
    checkButtons2State[i] = 0;
    checkButtons3State[i] = 0;
    checkButtons4State[i] = 0;
  }
}

void turnOnSliderLED(int sliderVal){
  int ledIndex;
  if(sliderVal <= 41){
    results[2] = mostFaithAnswers[7];
    ledIndex = 0;
  }else if(sliderVal > 41 && sliderVal <= 190){
    results[2] = mostFaithAnswers[6];
    ledIndex = 1;
  }else if(sliderVal > 190 && sliderVal <= 345){
    results[2] = mostFaithAnswers[5];
    ledIndex = 2;
  }else if(sliderVal > 345 && sliderVal <= 491){
    results[2] = mostFaithAnswers[4];
    ledIndex = 3;
  }else if(sliderVal > 491 && sliderVal <= 642){
    results[2] = mostFaithAnswers[3];
    ledIndex = 4;
  }else if(sliderVal > 642 && sliderVal <= 803){
    results[2] = mostFaithAnswers[2];
    ledIndex = 5;
  }else if(sliderVal > 803 && sliderVal <= 967){
    results[2] = mostFaithAnswers[1];
    ledIndex = 6;
  }else{  //sliderVal > 967
    results[2] = mostFaithAnswers[0];
    ledIndex = 7;
  }
  //turn aff all and turn on LED
  for(int i=0; i<8; i++){
    strip.setPixelColor(sliderLEDs[i], strip.Color(0,0,0));
  }
  strip.setPixelColor(sliderLEDs[ledIndex], strip.Color(127,0,0));
  strip.show();
}

void turnOnYesNoLEDs1(int ledIndex){
  for(int i=0; i<2; i++){
    digitalWrite(yesNoLEDs1[i], LOW);
  }
  digitalWrite(yesNoLEDs1[ledIndex], HIGH);
}

void turnOnYesNoLEDs2(int ledIndex){
  for(int i=0; i<2; i++){
    digitalWrite(yesNoLEDs2[i], LOW);
  }
  digitalWrite(yesNoLEDs2[ledIndex], HIGH);
}

void turnOnYesNoLEDs3(int ledIndex){
  for(int i=0; i<2; i++){
    digitalWrite(yesNoLEDs3[i], LOW);
  }
  digitalWrite(yesNoLEDs3[ledIndex], HIGH);
}

void turnOnYesNoLEDs4(int ledIndex){
  for(int i=0; i<2; i++){
    digitalWrite(yesNoLEDs4[i], LOW);
  }
  digitalWrite(yesNoLEDs4[ledIndex], HIGH);
}

void turnOnToggle1LED(int ledIndex){
  for(int i=0; i<3; i++){
    strip.setPixelColor(toggle1LEDs[i], strip.Color(0,0,0));
  }
  strip.setPixelColor(toggle1LEDs[ledIndex], strip.Color(127,127,0));
  strip.show();
}

void turnOnToggle2LED(int ledIndex){
  for(int i=0; i<3; i++){
    strip.setPixelColor(toggle2LEDs[i], strip.Color(0,0,0));
  }
  strip.setPixelColor(toggle2LEDs[ledIndex], strip.Color(127,127,0));
  strip.show();
}

void turnOnToggle3LED(int ledIndex){
  for(int i=0; i<3; i++){
    strip.setPixelColor(toggle3LEDs[i], strip.Color(0,0,0));
  }
  strip.setPixelColor(toggle3LEDs[ledIndex], strip.Color(127,127,0));
  strip.show();
}

void handleCheckButtons1(int buttonIndex){  //3,4,5
  if(checkButtons1State[buttonIndex] == 0){ //off so turn on
    results[3+buttonIndex] = yesNoAnswers[0];
    checkButtons1State[buttonIndex] = 1;
    strip.setPixelColor(checkLEDs1[buttonIndex], strip.Color(0,0,127));
    strip.show();
  }else{  //on so turn off
    results[3+buttonIndex] = yesNoAnswers[1];
    checkButtons1State[buttonIndex] = 0;
    strip.setPixelColor(checkLEDs1[buttonIndex], strip.Color(0,0,0));
    strip.show();
  } 
}

void handleCheckButtons2(int buttonIndex){  //6,7,8
  if(checkButtons2State[buttonIndex] == 0){ //off so turn on
    results[6+buttonIndex] = yesNoAnswers[0];
    checkButtons2State[buttonIndex] = 1;
    strip.setPixelColor(checkLEDs2[buttonIndex], strip.Color(0,0,127));
    strip.show();
  }else{  //on so turn off
    results[6+buttonIndex] = yesNoAnswers[1];
    checkButtons2State[buttonIndex] = 0;
    strip.setPixelColor(checkLEDs2[buttonIndex], strip.Color(0,0,0));
    strip.show();
  } 
}

void handleCheckButtons3(int buttonIndex){  //9,10,11
  if(checkButtons3State[buttonIndex] == 0){ //off so turn on
    results[9+buttonIndex] = yesNoAnswers[0];
    checkButtons3State[buttonIndex] = 1;
    strip.setPixelColor(checkLEDs3[buttonIndex], strip.Color(0,0,127));
    strip.show();
  }else{  //on so turn off
    results[9+buttonIndex] = yesNoAnswers[1];
    checkButtons3State[buttonIndex] = 0;
    strip.setPixelColor(checkLEDs3[buttonIndex], strip.Color(0,0,0));
    strip.show();
  } 
}

void handleCheckButtons4(int buttonIndex){  //12,13,14
  if(checkButtons4State[buttonIndex] == 0){ //off so turn on
    results[12+buttonIndex] = yesNoAnswers[0];
    checkButtons4State[buttonIndex] = 1;
    strip.setPixelColor(checkLEDs4[buttonIndex], strip.Color(0,0,127));
    strip.show();
  }else{  //on so turn off
    results[12+buttonIndex] = yesNoAnswers[1];
    checkButtons4State[buttonIndex] = 0;
    strip.setPixelColor(checkLEDs4[buttonIndex], strip.Color(0,0,0));
    strip.show();
  } 
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
