var trex, trex_running,trex_collided,ground, invisibleGround, groundMoving, groundImg;

var cloudImg, cloudsGroup;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup;

var score,PLAY,END;

var gameOverImg,resetImg,gameOver,reset;

var jumpSound,chekpointSound,dieSound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided= loadImage("trex_collided.png");
  groundMoving = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  resetImg=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}



function setup() {
  createCanvas(620, 200);

  trex = createSprite(50, 190);
  trex.addAnimation("trexRunning", trex_running)
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 185);
  ground.addImage("ground", groundMoving);
  ground.velocityX = -6;
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 190, 400, 5)
  invisibleGround.visible = false;
  
  gameOver=createSprite(300,70);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible=false;
  gameOver.scale=0.7;
  
  reset=createSprite(300,110);
  reset.addImage("reset",resetImg);
  reset.scale=0.6;
  reset.visible=false;

  cloudsGroup = new Group();
  obstacleGroup = new Group();
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  score=0;
}

function draw() {
  background(180);
  
  if(gameState===PLAY) {
    
    if (keyDown("space") && trex.y >= 164) {
     trex.velocityY = -10;
      jumpSound.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
     ground.x = ground.width / 2;
    }
    
    score=score+1;
    
    cloudFunction();
    
    obstacleFunction();
    
    if (obstacleGroup.collide(trex)) {
       gameState=END;
       dieSound.play();
    }
    
    if (score>0 && score % 100===0) {
      checkpointSound.play();
    }
  }

  else
  if(gameState===END) {
    trex.changeAnimation("trex_collided");
     ground.velocityX=0;
     obstacleGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     trex.velocityY=0;
    
     obstacleGroup.setLifetimeEach(-10);
     cloudsGroup.setLifetimeEach(-10);
    
     gameOver.visible=true;
     reset.visible=true;
    
     if(mousePressedOver(reset)) {
       resetFunction();
     }
  }
  

  trex.collide(invisibleGround);

  drawSprites();
  
  fill("black");
  text("Score :"+score,550,50)
}

function cloudFunction() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //adding clouds to clouds group
    cloudsGroup.add(cloud);
  }
}

function obstacleFunction() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 170, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle1);
        break;

      case 2:
        obstacle.addImage("obstacle2", obstacle2);
        break;

      case 3:
        obstacle.addImage("obstacle3", obstacle3);
        break;

      case 4:
        obstacle.addImage("obstacle4", obstacle4);
        break;

      case 5:
        obstacle.addImage("obstacle5", obstacle5);
        break;

      case 6:
        obstacle.addImage("obstacle6", obstacle6);
        break;

      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;

    //adding obstacles to obstacle group
    obstacleGroup.add(obstacle);
  }
}

function resetFunction() {
  gameOver.visible=false;
  reset.visible=false;
  
  cloudsGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  trex.changeAnimation("trexRunning");
  
  score=0;
  
  gameState=PLAY;
}




