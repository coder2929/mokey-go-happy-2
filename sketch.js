var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground   
var rscore

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(1000, 600);

  monkey = createSprite(25, 230, 20, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(200, 250, 500, 10);
  ground.velocityX = -3;

  obstacleGroup = createGroup();
  foodGroup = createGroup();

  score = 0;
  rscore = 0;
}


function draw() {
  background("white");

  textSize(20);
  stroke("black");
  text("Survival " + "time = " + score, 25, 25);
  text("Score = " + rscore, 225, 25);

  ground.velocityX = -(4 + 3 * score / 100);
  score = score + Math.round(getFrameRate() / 60);
  ground.x = ground.width / 2;
  monkey.collide(ground);

  if (keyDown("space") && monkey.y >= 210) {
    monkey.velocityY = -12;
    console.log(monkey.y);
  }
  monkey.velocityY = monkey.velocityY + 0.6;

  fruits();
  rocks();

  drawSprites();

  if (monkey.isTouching(foodGroup)) {
    rscore = rscore + 1;
    monkey.scale = monkey.scale + 0.01;
    monkey.y = monkey.y + 1;
  }
  if (monkey.isTouching(obstacleGroup)) {
    textSize(25);
    text("You Lost", 250, 150);
    obstacleGroup.setVelocityXEach(0);
    score = 0;
    rscore = 0;
    foodGroup.destroyEach();
    obstacle.destroy();
    monkey.scale = 0.1;
  }
}

function fruits() {
  if (World.frameCount % 100 === 0) {
    banana = createSprite(400, 50, 20, 20);
    banana.y = Math.round(random(54.3, 114.3));
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    foodGroup.add(banana);
  }
}

function rocks() {
  if (World.frameCount % 125 === 0) {
    obstacle = createSprite(450, 230, 40, 40);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;

    obstacleGroup.add(obstacle);
  }
}