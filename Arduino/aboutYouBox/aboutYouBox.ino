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
const String boxID = "1";

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
#define RESET (13)  // Not connected by default on the NFC Shield
Adafruit_NFCShield_I2C nfc(IRQ, RESET);
uint8_t success;
String cardID;
long lastScan = 0;

//button pins
int gender[] = {22,24,26,28};
int postcode[] = {5,6};
int arrows[] = {30,32,34,36,38,40,42,44};

//led pins
int genderLEDs[] = {A0,A1,A2,A3};
int postcodeLEDs[] = {A4,A5};
int startLED = 3;
int finishLED = 4;

//LED strip
int ledStrip = 46;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(17, ledStrip, NEO_GRB + NEO_KHZ800);
const int dataLength = 6;
char data[dataLength];
int slidervals[5] = {0, 0};  
char slideranswers[5] = {'X','X'};
int actLED1 = -1;
int actLED2 = -1;

//slider pins
int sliderpins[2] = {A12, A13};

//pot pins
int age = A11;
int duration = A10;

//duration
//long startTime = 0;
//long endTime = 0;
//long interactionTime = 0;

//results
const int resultsLength = 8;
String results[resultsLength];

//answers
String ageAnswers[] = {"0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-99","100+","pnts"};
String genderAnswers[] = {"male","female","trans","pnts"};
String durationAnswers[] = {"less than 1","1-3","3-10","longer than 10","pnts"};
String postcodeAnswers[] = {"Abroad","pnts"};
char postcodeLetters[] = {'_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
char postcodeALL[] = {'_','0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
int currentPostcode[] = {0,0,0,0};

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

  //setup buttons and leds
  for(int i=0; i<4; i++){
    pinMode(gender[i], INPUT);
    pinMode(genderLEDs[i], OUTPUT);
    digitalWrite(genderLEDs[i], LOW);
  }
  for(int i=0; i<2; i++){
    pinMode(postcode[i], INPUT);
    pinMode(postcodeLEDs[i], OUTPUT);
    digitalWrite(postcodeLEDs[i], LOW);
  }
  for(int i=0; i<8; i++){
    pinMode(arrows[i], INPUT);
  }
  pinMode(startLED, OUTPUT); digitalWrite(startLED, LOW);
  pinMode(finishLED, OUTPUT); digitalWrite(finishLED, LOW);
  
  //setup sliders
  for (int i=0; i < 2; i++)
  {
    pinMode(sliderpins[i], INPUT);
  }
  
  //setup potentiometers
  pinMode(age, INPUT);
  pinMode(duration, INPUT);
  
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
  /*while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // if there's no net connection, but there was one last time
  // through the loop, then stop the client:
  if (!client.connected() && lastConnected) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
  }*/
  
  //Check for NFC card every second
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;  // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  if((millis() - lastScan) > 1000){                          
    success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
    lastScan = millis();
  }
  
  //wait for card to be inserted - flash start LEDs
  if(!success){  //NO CARD INSERTED YET
    cardID = "";
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
      
    //get age
    int val = analogRead(age);
    if(val < 30){
      results[2] = ageAnswers[11];
    }else if(val >= 30 && val < 130){
      results[2] = ageAnswers[10];
    }else if(val >= 130 && val < 210){
      results[2] = ageAnswers[9];
    }else if(val >= 210 && val < 294){
      results[2] = ageAnswers[8];
    }else if(val >= 294 && val < 395){
      results[2] = ageAnswers[7];
    }else if(val >= 395 && val < 513){
      results[2] = ageAnswers[6];
    }else if(val >= 513 && val < 607){
      results[2] = ageAnswers[5];
    }else if(val >= 607 && val < 676){
      results[2] = ageAnswers[4];
    }else if(val >= 676 && val < 757){
      results[2] = ageAnswers[3];
    }else if(val >= 757 && val < 854){
      results[2] = ageAnswers[2];
    }else if(val >= 854 && val < 935){
      results[2] = ageAnswers[1];
    }else{
      results[2] = ageAnswers[0];
    }
    
    //check for button presses - gender
    for(int i=0; i<4; i++){
      if(digitalRead(gender[i]) == LOW){   //pressed
        if(millis() - lastButtonPress > 500){
          results[3] = genderAnswers[i];
          turnOnGenderLED(i);
          lastButtonPress = millis();
        }
      }
    }
    
    //check slider readings
    for (int i=0; i < 2; i++)
    {
      slidervals[i] = analogRead(sliderpins[i]);
      turnOnSliderLED(i);
    }
    
    //check for arrow presses - postcode
    for(int i=0; i<8; i++){
      if(digitalRead(arrows[i]) == LOW){ //pressed
        if(millis() - lastButtonPress > 500){
          handleArrowPress(i);
          lastButtonPress = millis();
        }
        //turn off other postcode buttons
        for(int i=0; i<2; i++){
          digitalWrite(postcodeLEDs[i], LOW);
        }
      }
    }
    
    //check for button presses - postcode
    for(int i=0; i<2; i++){
      if(digitalRead(postcode[i]) == LOW){ //pressed
        if(millis() - lastButtonPress > 500){
          results[6] = postcodeAnswers[i];
          turnOnPostcodeLED(i);
          lastButtonPress = millis();
        }
        //reset postcode display
        for(int i=0; i<4; i++){
          currentPostcode[i] = 0;
        }
        setPostcode();
      }
    }
    
    //get postcode duration
    int dVal = analogRead(duration);
    if(dVal < 168){
      results[7] = durationAnswers[4];
    }else if(dVal >= 168 && dVal < 367){
      results[7] = durationAnswers[3];
    }else if(dVal >= 367 && dVal < 659){
      results[7] = durationAnswers[2];
    }else if(dVal >= 659 && dVal < 872){
      results[7] = durationAnswers[1];
    }else{
      results[7] = durationAnswers[0];
    }
  }
  
  // store the state of the connection for next time through
  // the loop:
  //lastConnected = client.connected();
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
    //upload results
     uploadResults();
     resetResults();
     gotData = false;
    //set LCD screen text
    Wire.beginTransmission(111);
    Wire.write(0);  //show INSERT CARD message
    Wire.endTransmission();
  }
  
  //turn off leds
  for(int i=0; i<4; i++){
    digitalWrite(genderLEDs[i], LOW);
  }
  for(int i=0; i<2; i++){
    digitalWrite(postcodeLEDs[i], LOW);
  }
  digitalWrite(finishLED, LOW);
  
  //turn off postcode LCD
  Wire.beginTransmission(222);
  Wire.write("!");
  Wire.endTransmission();
  
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
  
  //turn on postcode LCD screen
  setPostcode();
  
  //set LCD screen text
  Wire.beginTransmission(111);
  Wire.write(1);  //show BOX ACTIVE message
  Wire.endTransmission();
}

void turnOnGenderLED(int ledIndex){
  for(int i=0; i<4; i++){
    digitalWrite(genderLEDs[i], LOW);
  }
  digitalWrite(genderLEDs[ledIndex], HIGH);
}

void turnOnPostcodeLED(int ledIndex){
  for(int i=0; i<2; i++){
    digitalWrite(postcodeLEDs[i], LOW);
  }
  digitalWrite(postcodeLEDs[ledIndex], HIGH);
}

void setPostcode(){
  Wire.beginTransmission(222);
  int index = currentPostcode[0];
  Wire.write(postcodeLetters[index]);
  for(int i=1; i<4; i++){
    index = currentPostcode[i];
    Wire.write(postcodeALL[index]);
  }
  Wire.endTransmission();
}

void resetResults(){
  for(int i=0; i<resultsLength; i++){
    results[i] = "-1";
  }
  results[0] = boxID;
  //reset postcode too
  for(int i=0; i<4; i++){
    currentPostcode[i] = 0;
  }
}

void turnOnSliderLED(int cur){ 
  if (cur == 0) //slider with 9 options
  {
    
    if (slidervals[cur] > 1000)
    {
      actLED1 = 0;
      //slideranswers[0] = '1';
      results[4] = "1";
    }
    else if (slidervals[cur] > 900 && slidervals[cur] <= 1000) 
    {
      actLED1 = 1;
      //slideranswers[0] = '2';
      results[4] = "2";
    }
    else if (slidervals[cur] > 750 && slidervals[cur] <= 900) 
    {
      actLED1 = 2;
      //slideranswers[0] = '3';
      results[4] = "3";
    }
    else if (slidervals[cur] > 508 && slidervals[cur] <= 750) 
    {
      actLED1 = 3;
      //slideranswers[0] = '4';
      results[4] = "4";
    }
    else if (slidervals[cur] > 456 && slidervals[cur] <= 508) 
    {
      actLED1 = 4;
      //slideranswers[0] = '5';
      results[4] = "5";
    }
    else if (slidervals[cur] > 342 && slidervals[cur] <= 456) 
    {
      actLED1 = 5;
      //slideranswers[0] = '6';
      results[4] = "6";
    }
    else if (slidervals[cur] > 228 && slidervals[cur] <= 342) 
    {
      actLED1 = 6;
      //slideranswers[0] = '7';
      results[4] = "7";
    }
    else if (slidervals[cur] > 90 && slidervals[cur] <= 228) 
    {
      actLED1 = 7;
      //slideranswers[0] = '8';
      results[4] = "8";
    }
    else
    {
      actLED1 = 8;
      //slideranswers[0] = '9';
      results[4] = "9";
    }
  }
  else if (cur == 1) //slider with 8 options
  {
    //Serial.println("Slider 2 activated");
    
   if (slidervals[cur] > 896)
   {
      actLED2 = 9;
      //slideranswers[1] = '1';
      results[5] = "1";
    }
    else if (slidervals[cur] > 768 && slidervals[cur] <= 896) 
    {
      actLED2 = 10;
      //slideranswers[1] = '2';
      results[5] = "2";
    }
    else if (slidervals[cur] > 640 && slidervals[cur] <= 768) 
    {
      actLED2 = 11;
      //slideranswers[1] = '3';
      results[5] = "3";
    }
    else if (slidervals[cur] > 512 && slidervals[cur] <= 640) 
    {
      actLED2 = 12;
      //slideranswers[1] = '4';
      results[5] = "4";
    }
    else if (slidervals[cur] > 384 && slidervals[cur] <= 512) 
    {
      actLED2 = 13;
      //slideranswers[1] = '5';
      results[5] = "5";
    }
    else if (slidervals[cur] > 256 && slidervals[cur] <= 384) 
    {
      actLED2 = 14;
      //slideranswers[1] = '6';
      results[5] = "6";
    }
    else if (slidervals[cur] > 128 && slidervals[cur] <= 256) 
    {
      actLED2 = 15;
      //slideranswers[1] = '7';
      results[5] = "7";
    }
    else
    {
      actLED2 = 16;
      //slideranswers[1] = '8';
      results[5] = "8";
    }
  }
  
  //light up the right LED by turning all off first and then activating the right one
  for(int i=0; i<strip.numPixels(); i++)
  {
    
    if (i == actLED1 || i == actLED2)
      strip.setPixelColor(i, strip.Color(127,0,0));
    else
      strip.setPixelColor(i, strip.Color(0,0,0));
  }
    
  strip.show();
}

void handleArrowPress(int arrow){
  if(arrow == 0){ //first up
    if(currentPostcode[0] < 26){
      currentPostcode[0]++;
    }else{
      currentPostcode[0] = 0;  //loop around
    }
  }else if(arrow == 1){ //first down
    if(currentPostcode[0] > 0){
      currentPostcode[0]--;
    }else{
      currentPostcode[0] = 26;  //loop around
    }
  }
  
  else if(arrow == 2){ //second up
    if(currentPostcode[1] < 36){
      currentPostcode[1]++;
    }else{
      currentPostcode[1] = 0;
    }
  }else if(arrow == 3){ //second down
    if(currentPostcode[1] > 0){
      currentPostcode[1]--;
    }else{
      currentPostcode[1] = 36;
    }
  }
  
  else if(arrow == 4){ //third up
    if(currentPostcode[2] < 36){
      currentPostcode[2]++;
    }else{
      currentPostcode[2] = 0;
    }
  }else if(arrow == 5){ //third down
    if(currentPostcode[2] > 0){
      currentPostcode[2]--;
    }else{
      currentPostcode[2] = 36;
    }
  }
  
  else if(arrow == 6){ //fourth up
    if(currentPostcode[3] < 36){
      currentPostcode[3]++;
    }else{
      currentPostcode[3] = 0;
    }
  }else if(arrow == 7){ //fourth down
    if(currentPostcode[3] > 0){
      currentPostcode[3]--;
    }else{
      currentPostcode[3] = 36;
    }
  }
    
  setPostcode();
  
  String postcodeString = "";
  int index = currentPostcode[0];
  postcodeString = String(postcodeString + postcodeLetters[index]);
  for(int i=1; i<4; i++){
    index = currentPostcode[i];
    postcodeString = String(postcodeString + postcodeALL[index]);
  }
  results[6] = postcodeString;
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






