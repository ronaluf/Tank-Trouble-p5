//initialize
let size = 4;
let w = 800/ size;
let grid = [];
let stack = [];
let balls = [];
let walls = [];
let score = [0,0];
let tank1;
let tank2;
let rows;
let cols;
let current;

//setup
function setup() {
  createCanvas(800, 800);
  rows = height / w;
  cols = width / w;

  makeMaze();
    tank1 = new Tank(1);
  tank2 = new Tank(2);

  //bounderies

}

//draw
function draw() {
  background(255);
  frameRate(60);
  textSize(30);
  fill(0,255,0);
  text(score[0], 300, 30);
  fill(0);
  text( ":", 338, 28);
  fill(255,0,0)
  text( + score[1], 370, 30);
  //display walls and handle collision 
  for (let i = 0; i < grid.length; i++) {
        grid[i].show();
        
    }
    for (let i = 0; i < walls.length; i++) {
      tank1.coll(walls[i]);
      tank2.coll(walls[i]);    
    }
  
//display balls and handle collision 
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].life == 0) {
      if(balls[i].player == 1)
        {
          tank1.balls++;
      
        }
        if(balls[i].player == 2)
        {
          tank2.balls++; 
        }
      balls.splice(i, 1);
    } else {
      balls[i].show();
      balls[i].move();
      //someone died 
      if(tank1.checkBallCollision(balls[i]))
        {
         score[0]++;
         newRound();        
        }
      if(tank2.checkBallCollision(balls[i]))
        {
          score[1]++;
          newRound(); 
        }
 
      for (j = 0; j < walls.length; j++) {
        balls[i].coll(walls[j]);
      }
    }
  }

  tank1.show(); //display tank
  tank1.move(); //move the tank
  tank2.show(); //display tank
  tank2.move(); //move the tank


}

function newRound()
{
          tank1.reset();
          tank2.reset();
          makeMaze();
           for (j = 0; j < balls.length; j++) 
            {
              balls[j].life = 0;
            }
          
}


function makeMaze()
{
  walls = [];
  grid = [];
  size = int(random(2,9))
  w = height / size;
  rows = height / w;
  cols = width / w;
  let c = 0;
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      grid[c] = new Cell(i, j);
      c++;
    }
  }
  current = grid[0];

  //make maze
  maze(current);
  
    walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(0, height, width, height));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i].walls[j]) {
        walls.push(grid[i].walls[j]);
      }
    }
  }
}

function maze(current) {
  current.visited = true;
  var next = current.getNeighbors();
  if (next) {
    current.deleteWalls(next);
    next.visited = true;
    stack.push(next);
    maze(next);
  } else {
    if (stack.length > 0) {
      maze(stack.pop());
    }
  }
}



function index(i, j) {
  if (i < 0 || j < 0 || i >= rows || j >= cols) {
    return -1;
  }
  return i + j * cols;
}

async function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function keyPressed() {
  if (keyCode === 13) {
    tank1.shoot();
  }
  
    if (keyCode === 32) {
    tank2.shoot();
  }
}