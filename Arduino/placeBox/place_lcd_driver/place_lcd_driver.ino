/*
* Sarah Gallacher
*/

// include the library code:
#include <LiquidCrystal.h>
#include <Wire.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(7, 8, 9, 10, 11, 12); //RS, E, D8, D9, D10, D11

int displayID = 111;

void setup() {
  Serial.begin(9600);
  
  // set up the LCD's number of columns and rows: 
  lcd.begin(16, 2);
  
  //initialise WIRE
  Wire.begin(displayID);
  Wire.onReceive(handleEvent);
  
  Serial.print("slave initialised with ID: ");
  Serial.println(displayID);
}

void loop() {
  delay(100);
}

void handleEvent(int num){
  int x = Wire.read();
  showMessage(x);
}

void showMessage(int type){
  lcd.clear();
  if(type == 0){
    lcd.setCursor(0,0);
    lcd.print("INSERT CARD");
    lcd.setCursor(0,1);
    lcd.print("TO BEGIN");
  }else if(type == 1){
    lcd.setCursor(0,0);
    lcd.print("BOX");
    lcd.setCursor(0,1);
    lcd.print("ACTIVE");
  }else if (type == 3){
    lcd.setCursor(0,0);
    lcd.print("BOX STOPPING");
    lcd.setCursor(0,1);
    lcd.print("SAVING DATA...");
  }
}



