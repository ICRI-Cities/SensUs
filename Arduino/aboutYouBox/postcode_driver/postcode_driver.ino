/*
* Sarah Gallacher
*/

// include the library code:
#include <LiquidCrystal.h>
#include <Wire.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(7, 8, 9, 10, 11, 12); //RS, E, D8, D9, D10, D11

int displayID = 222;

int positions[] = {1,5,9,13};

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
  int index = 0;
  while(Wire.available()){
    char c = Wire.read();
    if(c == '!'){
      lcd.clear();  //turn off screen - blank postcode
      return;
    }else{
      showElement(index, c);
      index++;
    }
  }
  lcd.setCursor(0,0);
  lcd.print("POSTCODE:");
}

void showElement(int index, char element){
  lcd.setCursor(positions[index],1);
  lcd.print(element);
}



