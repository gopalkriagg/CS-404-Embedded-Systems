/************************************ETCH-A-SKETCH*********************************
 *  Author:  Gopal Krishan Aggarwal
 *  Roll No: B13121
 *  Date: 18 August, 2015
 *  Description: Following code implements a simple version of Etch-A-Sketch in which
    user specifies the dimensions of the arena in the beginning, then specifies the
    position. Then the user can continue to sketch by entering one of 'w', 'a', 's',
    'd' for position control, 'q' to quit or 'c' to clear arena.
**********************************************************************************/
#define dbg(x) cout <<"The value of variable " << #x << " is " << x << endl;
#include <iostream>
#include <cstdio>
#include <iomanip>
using namespace std;

//Resets/Clears the arena
void resetGame(int ** arena, int matrixDim) {
  for(int i = 1; i <= matrixDim; i++) {
    for(int j = 1; j <= matrixDim; j++) {
      arena[i][j] = ' ';
    }
  }
  cout <<"\nArena cleared\n";
}

//Prints the current arena
void printArena(int ** arena, int matrixDim) {
 for(int i = 0; i <= matrixDim; i++) {
    for(int j = 0; j <= matrixDim; j++) {
      if(arena[i][j] == ' ' || arena[i][j] == 'x')
	cout << setw(3) << (char) arena[i][j];
      else
	cout << setw(3) << arena[i][j];
    }
    cout <<"\n";
  }
}

//To determine if the position specified by x,y is valid for given arena
bool isPositionValid(int matrixDim,int x,int y) {
  if( x > 0 && x <= matrixDim && y > 0 && y <= matrixDim)
    return true;
  else return false;
} 

//To set initial position
void setInitialPosition(int ** arena, int matrixDim, int &x, int &y) {
  do{
    cout << "\nPlease specify valid initial position in horizontal direction: ";
    cin >> y;
    cout << "Please specify valid initial position in vertical direction: ";
    cin >> x;
  }while(!isPositionValid(matrixDim, x, y));

  arena[x][y] = 'x';
}

int main() {
  int matrixDim; //Square matrix
  cout << "Please enter size of etch-a-sketch arena: \n";
  cin >> matrixDim;
  
  //creating the required storage space for arena
  int ** arena = new int*[matrixDim+1];
  for(int i = 0; i <= matrixDim; i++) {
    arena[i] = new int[matrixDim+1];
  }
  

  cout << "\v";
  
  //setting up the first row and column
  for(int i = 1; i <= matrixDim; i++) {
    arena[0][i] = arena[i][0] = i;
  }
  arena[0][0] = ' ';


  resetGame(arena, matrixDim); //To clear actual arena of garbage values
  printArena(arena, matrixDim);
 
  
  int x, y; //Specifies x and y positions x=1,y=1 being the top left corner of arena
  setInitialPosition(arena, matrixDim, x, y);  
  printArena(arena, matrixDim);


  cout << "Enter 'w', 'a', 's' or 'd' to move up, left, down or right respectively."
    "\nPress 'c' to clear else press 'q' to quit."
    "\nHappy Sketching\nPlease enter first input: ";
  char input;  
  cin >> input;
  getchar();  //To clear inut buffer
  while(input != 'q' && input != 'Q') {
    //dbg(input);
    switch(input) {
    case 'd': if(isPositionValid(matrixDim, x, y+1)) {
	y = ++y;
	arena[x][y] = 'x';
	printArena(arena, matrixDim);
      }
      else cout << "Value out of bounds!\n";
      break;
    case 'w': if(isPositionValid(matrixDim, x-1, y)) {
	x = --x;
	arena[x][y] = 'x';
	printArena(arena, matrixDim);
      }
      else cout << "Value out of bounds!\n";
      break;
    case 'a': if(isPositionValid(matrixDim, x, y-1)) {
	y = --y;
	arena[x][y] = 'x';
	printArena(arena, matrixDim);
      }
      else cout << "Value out of bounds!\n";
      break;
    case 's': if(isPositionValid(matrixDim, x+1, y)) {
	x = ++x;
	arena[x][y] = 'x';
	printArena(arena, matrixDim);
      }
      else cout << "Value out of bounds!\n";
      break;
    case 'c': resetGame(arena, matrixDim);
      setInitialPosition(arena, matrixDim, x, y);
      printArena(arena, matrixDim);
      break;
    case 'q':
    case 'Q': cout << "Goodbye! Hope you enjoyed\n"; // will never be executed
      break;
    default: cout << "Invalid input\n";
    };
    cout << "\nCurrent positon is " << y << " columns right and " << x << " rows down.\n";	  
    cout << "\nPlease enter next valid input: ";
    cin >> input;
    getchar();
  }
  cout << "Goodbye! Hope you enjoyed\n";
}
