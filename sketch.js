
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var rand ;
var redzone
var redzoneImage
var score
var i = 0
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	redzoneImage = loadImage("thatredbin.png")
	
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	score = 0

	engine = Engine.create();
	world = engine.world;
	
	rand= Math.round(random(250,700));
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	redzone = createSprite(rand,620,200,20)
	redzone.addImage(redzoneImage)
	//redzone.rotation=50
	redzone.scale=0.25

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	groundSprite=createSprite(ground.position.x, ground.position.y, width,10);
	groundSprite.shapeColor=color(255)


	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.7, isStatic:true});
	World.add(world, packageBody);

  
}


function draw() {
  rectMode(CENTER);
  background(0);
  strokeWeight(4)
  stroke("red")
  textSize(20)
  text("score ="+score,700,40)
  Engine.update(engine);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  //packageSprite.x = helicopterSprite.x
 /* if(i===0){
	packageSprite.x = helicopterSprite.x
  }*/

  keyPressed()

  if(packageSprite.isTouching(redzone)){
       score+=1
  }

  drawSprites();

 
}

function keyPressed() {
 if (keyDown("Down_Arrow")) {
   Matter.Body.setStatic(packageBody,false)
  // i += 1
    
  }
  if(keyDown("Right_Arrow")){
	  helicopterSprite.x+=3
	  packageSprite.x=helicopterSprite.x;
  }
  if(keyDown("Left_Arrow")){
	helicopterSprite.x-=3;
	packageSprite.x=helicopterSprite.x;
}
}



