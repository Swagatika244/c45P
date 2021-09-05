const {World, Engine, Bodies, Body, Constraint} = Matter;

var engine, world, canvas;
var backgroundImg1, backgroundImg2, backgroundImg3;
var thor;

const BEGINNING = 0;
const PLAY_LEVEL1 = 1;
const PLAY_LEVEL2 = 2;
const GAME_END1 = 3 ;
const GAME_END2 = 4 ;

var gameState = 1;
var ground, stand, standImg, left_Wall, right_wall;
var steps = [];
var deaths = [];
var randX, randVelocity; 

const LEFT = -5;
const RIGHT = 5;
var right_change  = [RIGHT, RIGHT, RIGHT, RIGHT];
var left_change  = [LEFT, LEFT, LEFT];
var deathImg, death;
var death_V_change = [0, 0, 0, 0, 0, 0, 0];

var left_ellipses = [];
var right_ellipses = [];

var weaponImg = [];
var weapons = [];
var swordOfDeathImg;
var ellipse_swords = [];
var weapon_visible = [0, 0, 0, 0, 0, 0, 1];


function preload(){
  backgroundImg1 = loadImage("assets/backgroundImg1.jpg");
  backgroundImg2 = loadImage("assets/backgroundImg2.jpg");
  backgroundImg3 = loadImage("assets/backgroundImg3.jpg");
  deathImg = loadImage("assets/death1.png");
  standImg = loadImage("assets/ground.png");

  weaponImg[0] = loadImage("assets/weapons/weapon1.png");
  weaponImg[1] = loadImage("assets/weapons/weapon2.png");
  weaponImg[2] = loadImage("assets/weapons/weapon3.png");
  weaponImg[3] = loadImage("assets/weapons/weapon4.png");
  weaponImg[4] = loadImage("assets/weapons/weapon5.png");
  weaponImg[5] = loadImage("assets/weapons/weapon6.png");
  weaponImg[6] = loadImage("assets/weapons/weapon7.png");

  swordOfDeathImg = loadImage("assets/weapons/swordOfDeath.png");

}

function setup() {
  engine = Engine.create();
  world = engine.world;
  canvas = createCanvas(windowWidth,windowHeight);

  // ground create 
  ground = createSprite(width/2, height+10 , width, 20);
  
if(gameState === 1){

// beginning stand point 
stand = createSprite(100, height -10, 200, 20);
stand.addImage(standImg);
stand.scale = 0.1

// steps create 
  for (var j = 50; j < height-100; j = j +100){
    randX = random(200, width - 200);
    var step = createSprite(randX, j, 200, 15);
    steps.push(step);
    randVelocity = random(-3, 3);
  }

// create death 
  for (var i = 0; i < steps.length; i++){
    death = createSprite(steps[i].x, steps[i].y -33);
    deaths.push(death);
    death.addImage(deathImg);
    death.scale = 0.06;
  }

// create feedback_ellipses
  for(var i =0; i<7; i++){
    var left_ellipse = new Feedback_ellipse(50, (height-100) - i*100, 30);
    left_ellipses.push(left_ellipse);

    var right_ellipse = new Feedback_ellipse(width - 60, (height-100) - i*100, 30);
    left_ellipses.push(right_ellipse);
  }

// create Thorgrin 
   thor = createSprite(stand.x, stand.y-50, 20, 20);
   thor.shapeColor = "red";
   //thor.addImage("weapon1", swordOfDeathImg);
   //thor.scale = 0.2;

// create weapons
for(var i =0; i<7; i++){
  var weaponPosition = [
    [400, 300],
    [width-400, 600],
    [width-400, 200],
    [width/2 , 100],
    [width-width/2, 400],
    [width/2-500, 50],
    [200, 500]
  ]

  var x = weaponPosition[i][0];
  var y = weaponPosition[i][1];
  var weapon = createSprite(x, y);
  weapon.addImage(weaponImg[i]);
  weapon.scale = 0.2
  weapons.push(weapon);



  if(weapon_visible[i] === 1){
    weapons[i].visible = true;
    var ellipse_sword = new Feedback_ellipse(weapons[i].x, weapons[i].y, 50);
    ellipse_swords.push(ellipse_sword);

  }else{
    weapons[i].visible = false;
  }
  
}

}


}

function draw() {
  Engine.update(engine);

  if(gameState === BEGINNING){
    beginning();
  }
  if(gameState === PLAY_LEVEL1){
    play_level_1();
  }
  if(gameState === PLAY_LEVEL2){
    play_level_2();
  }
  if(gameState === GAME_END1){
    game_end_1();
  }
  if(gameState === GAME_END2){
    game_end_2();
  }
  // draw sprites
   push ();
   fill(0,0,0, 100);
   drawSprites();
   pop ();

  /*fill (255);
  textFont("jokerman");
  textSize(60);
  stroke (255);
  text("hello", 200, 200);*/
}

function beginning(){
  background(backgroundImg1);  

  
}
function play_level_1(){
  // background set
  background(backgroundImg2);  

  for(var step of steps){
    step.shapeColor = rgb(255, 255);
  }

  for(var ellipse of left_ellipses){
    ellipse.display(0,255,239, 70);
  }
  for(var ellipse of right_ellipses){
    ellipse.display(0,255,239, 70);
  }
  for(var ellipse of ellipse_swords){
    ellipse.display(57,255, 20, 70);
  }
  

  if(steps !== undefined){
  // steps[0] velocity set
  if(right_change[0] === RIGHT){
      steps[0].velocityX = 5;
  }
  if(steps[0].x > width-150){
      right_change[0] = LEFT;
      steps[0].velocityX = -5;
  }
  if(steps[0].x < 150){
      steps[0].velocityX = 5;
  }

  // steps[2] velocity set
  if(right_change[1] === RIGHT){
    steps[2].velocityX = 4;
  }
  if(steps[2].x > width-150){
      right_change[1] = LEFT;
      steps[2].velocityX = -4;
  }
  if(steps[2].x < 150){
      steps[2].velocityX = 4;
  }
  
  // steps[4] velocity set
  if(right_change[2] === RIGHT){
    steps[4].velocityX = 6;
  }
  if(steps[4].x > width-150){
    right_change[2] = LEFT;
    steps[4].velocityX = -6;
  }
  if(steps[4].x < 150){
    steps[4].velocityX = 6;
  }
  
  // steps[6] velocity set
  if(right_change[3] === RIGHT){
    steps[6].velocityX = 3;
  }
  if(steps[6].x > width-150){
    right_change[3] = LEFT;
    steps[6].velocityX = -3;
  }
  if(steps[6].x < 150){
    steps[6].velocityX = 3;
  }
  
  // steps[1] velociy set 
  if(left_change[0]=== LEFT){
    steps[1].velocityX = -3;
  }
  if(steps[1].x < 150){
    left_change[0] = RIGHT;
    steps[1].velocityX = 3;
  }
  if(steps[1].x > width-150){
    steps[1].velocityX = -3;
  }

  // steps[3] velociy set 
  if(left_change[1]=== LEFT){
    steps[3].velocityX = -4;
  }
  if(steps[3].x < 150){
    left_change[1] = RIGHT;
    steps[3].velocityX = 4;
  }
  if(steps[3].x > width-150){
    steps[3].velocityX = -4;
  }

  // steps[5] velociy set 
  if(left_change[2]=== LEFT){
    steps[5].velocityX = -6;
  }
  if(steps[5].x < 150){
    left_change[2] = RIGHT;
    steps[5].velocityX = 6;
  }
  if(steps[5].x > width-150){
    steps[5].velocityX = -6;
  }
}
  if(deaths !== undefined){

  for(var i = 0; i < steps.length; i++){

    let right = steps[i].velocityX;
    let left = -steps[i].velocityX

    if(steps[i].velocityX === right){
      if(death_V_change[i]===0){
        deaths[i].velocityX = -7
      }
      if(deaths[i].x <= steps[i].x -80){
        death_V_change[i]= 1 ;

        deaths[i].velocityX = 7;
      }
      if(deaths[i].x >= steps[i].x +80){
        deaths[i].velocityX = -7;
      }
      
  
    }
    if(steps[i].velocityX === left){
      if(death_V_change[i+1]===0){
        deaths[i].velocityX = -7;
      }
      if(deaths[i].x <= steps[i].x -80){
        death_V_change[i+1] = 1;
        deaths[i].velocityX = 1;
      }
      if(deaths[i].x >= steps[i].x +80){
        deaths[i].velocityX = -7;
      }
  } 
  
  }
}

  // move thor 
  if(keyDown(LEFT_ARROW)){
    thor.x -=5;
  }
  if(keyDown(RIGHT_ARROW)){
    thor.x +=5;
  }
  if(keyDown(DOWN_ARROW)){
    thor.y +=5;
  }
  if(keyDown(UP_ARROW)){
    thor.y -=5;
  }
  
  
  
  
               
}
function play_level_2(){
  background(backgroundImg3);  

}
function game_end_1(){
  background(backgroundImg2);  

}
function game_end_2(){
  background(backgroundImg3);  

}class Feedback_ellipse{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }display(r, g, b, a){
    noStroke();

    fill(r, g, b, a);
    //fill(0,255,239, 70);
    //fill(57,255, 20, 70)
    //fill(255,200,255, 70);



    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r);
  }
}