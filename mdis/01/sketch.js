// M•DISE Cellular Automata
// By Jaime Patarroyo
// Based on Daniel Shiffman's The Nature of Code

var gol;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  gol = new GOL();

}

function draw() {
  background(0);

  gol.generate();
  gol.display();
}

// reset board when mouse is pressed
function mousePressed() {
  gol.init();
}

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  
  gol.init();
}


function GOL() {
  this.w = 40;
  this.columns = floor(width / this.w)+1;
  this.rows = floor(height / this.w)+1;

  // Game of life board
  this.board = make2Darray(this.columns, this.rows);
  this.colors = make2Darray(this.columns, this.rows);

  this.randomColor = function() {
    var col;
    var r = floor(random(100));

    if (r < 30) col = color(0, 189, 207);
    else if (r >= 30 && r < 60) col = color(35, 31, 32);
    else if (r >= 60 && r < 90) col = color(255, 255, 255);
    else col = color(235, 34, 39);

    return col;
  }

  this.init = function() {
    this.columns = floor(width / this.w)+1;
    this.rows = floor(height / this.w)+1;

    // Game of life board
    this.board = make2Darray(this.columns, this.rows);
    this.colors = make2Darray(this.columns, this.rows);
    
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j] = 0; //int(random(2));
        this.colors[i][j] = this.randomColor();
      }
    }
  }
  this.init();

  // The process of creating the new generation
  this.generate = function() {
    var next = make2Darray(this.columns, this.rows);

    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {

        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y];

        // Rules of Life
        if ((this.board[x][y] == 1) && (neighbors < 2)) { // Loneliness
          next[x][y] = 0;
        } else if ((this.board[x][y] == 1) && (neighbors > 3)) { // Overpopulation
          next[x][y] = 0;
        } else if ((this.board[x][y] == 0) && (neighbors == 3)) { // Reproduction
          next[x][y] = 1;
          this.colors[x][y] = this.randomColor();
        } else { // Stasis
          next[x][y] = this.board[x][y];
        }
      }
    }

    // Next is now our board
    this.board = next;

    var rR = int(random(1, this.columns - 1));
    var rC = int(random(1, this.rows - 1));

    //board[rR][rC] = int(random(2));
    this.board[rR + 1][rC] = int(random(2));
    this.board[rR - 1][rC] = int(random(2));
    this.board[rR][rC + 1] = int(random(2));
    this.board[rR][rC - 1] = int(random(2));
  }

  // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
  this.display = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        if ((this.board[i][j] == 1)) fill(this.colors[i][j]); //fill(235, 34, 39);
        else fill(this.colors[i][j]); //fill(255);
        noStroke();
        rect(i * this.w, j * this.w, this.w, this.w);
      }
    }
  }
}
