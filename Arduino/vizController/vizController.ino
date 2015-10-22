//#include <WiFi.h>
//#include <Adafruit_NeoPixel.h>
#include <Adafruit_NFCShield_I2C.h>
#include <Wire.h>

//card reader
#define IRQ   (2)
#define RESET (3)  // Not connected by default on the NFC Shield
Adafruit_NFCShield_I2C nfc(IRQ, RESET);
uint8_t success;
String cardID;
long lastScan = 0;

//LEDs
int nextLED = 6;
int prevLED = 7;

//Buttons
int nextButton = 4;
int prevButton = 5;

long lastButtonPress = 0;
boolean firstRegister = true;
boolean reset = true;

void setup(){
  Serial.begin(9600);
  //Serial.println("initialising...");
  
  //initialise WIRE
  Wire.begin();
  
  //initialise NFC
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    //Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
  //Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  //Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  //Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  //set for 2 tries before moving on
  nfc.setPassiveActivationRetries(0x02);
  // configure board to read RFID tags
  nfc.SAMConfig();
  //initialise success
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  //initialise LEDs
  pinMode(nextLED, OUTPUT); digitalWrite(nextLED, LOW);
  pinMode(prevLED, OUTPUT); digitalWrite(prevLED, LOW);
  
  //initialise Buttons
  pinMode(prevButton, INPUT); 
  pinMode(nextButton, INPUT); 
}

void loop(){
   //Check for NFC card every second
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;  // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  if((millis() - lastScan) > 1000){                          
    success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
    lastScan = millis();
  }
  
  //wait for card to be inserted
  if(!success){  //NO CARD INSERTED YET
    if(reset){
      Serial.println("I");
      reset = false;
    }
      
    cardID = "";
    firstRegister = true;
    
    //turn off button LEDs
    digitalWrite(nextLED, LOW);
    digitalWrite(prevLED, LOW);
    
  }else{  //CARD INSERTED
    if(firstRegister){
      firstRegister = false;
      
      //process card ID
      for (uint8_t i=0; i < uidLength; i++){ 
        cardID = String(cardID + uid[i]);
      }
      //Serial.print("card ID = ");
      //Serial.println(cardID);
      
      //show data
      Serial.print("W");
      Serial.println(cardID);
    }
    reset = true;
    
    digitalWrite(nextLED, HIGH);
    digitalWrite(prevLED, HIGH);
    
    //check for button presses
    if(digitalRead(nextButton) == LOW){  //pressed
      if(millis() - lastButtonPress > 500){
        lastButtonPress = millis();
        //show next visualisation
         Serial.print("N");
         Serial.println(cardID);
      }
    }
    if(digitalRead(prevButton) == LOW){  //pressed
      if(millis() - lastButtonPress > 500){
        lastButtonPress = millis();
        //show previous visualisation
        Serial.print("P");
        Serial.println(cardID);
      }
    }
  }
}


//  if (success) {
//      if(firstRegister) {
//        String cardID = "";
//        for (uint8_t i=0; i < uidLength; i++){ 
//          cardID = String(cardID + uid[i]);
//        }
//        ID = cardID;
//        Serial.print("W");
//        Serial.println(cardID);
//        firstRegister=false;
//        firstOut=true;
//      }
//  } else if (firstOut) {
//     ID = "0";
//     firstRegister = true;
//     firstOut = false;
//     Serial.println("I");
//  }
