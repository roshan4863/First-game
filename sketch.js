var sdImg, sd;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ad ,adImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  sdImg = loadImage("sd.gif");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  adImg = loadImage("ad.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  sd = createSprite(300,300);
  sd.addImage("sd",sdImg);
  sd.velocityY = 1;
  
  ad =createSprite(200,200,50,50);
  ad.addImage(adImg);
  ad.scale=0.3

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if(gameState==="play"){
  
  if(sd.y > 400){
      sd.y = 300
    }

    if(keyDown("space")){
      ad.velocityY=-5;
    }
    ad.velocityY+=0.8

    if(keyDown("left_arrow")){
      ad.x =ad.x-3;
    }

    if(keyDown("right_arrow")){
      ad.x=ad.x+3
    }

    if(climbersGroup.isTouching(ad)){
      ad.velocityY=0

    }
    if(invisibleBlockGroup.isTouching(ad)||ad.y>600){
      ad.destroy();
      gameState="end"
    }

    spawnObjects()
    drawSprites()
   }
   if(gameState==="end"){
    stroke("red")
    fill("orange")
    textSize(50)
    text("game over",240,260)
   }
}

function spawnObjects(){
if(frameCount % 240 === 0){
  door=createSprite(Math.round(random(120,400)),-50);
  door.addImage(doorImg);
  door.velocityY=1; 
  door.lifetime=800;
  doorsGroup.add(door);

  climber=createSprite(200,10);
  climber.addImage(climberImg);
  climber.velocityY=1; 
  climber.x= door.x;
  climber.lifetime=800;
  climbersGroup.add(climber); 

  invisibleBlock=createSprite(200,15,climber.width,2);
  invisibleBlock.velocityY=1; 
  invisibleBlock.x= door.x;
  invisibleBlock.lifetime=800;
  invisibleBlock.debug=true

  invisibleBlockGroup.add(invisibleBlock); 


  ad.depth=door.depth
  ad.depth+=1
}
}