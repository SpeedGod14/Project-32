const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState = "onSling";
var bg = "white.jpg";
var backgroundImg

function preload(){
  polygon_img = loadImage("polygon.png")
  getBackgroundImg();
}

function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(800,400);

  var options = {
    restitution: 0.5,
    friction: 0.3,
    density: 0.3
  }
  polygon = Bodies.circle(50,200,20, options);
  World.add(world,polygon);

  slingshot = new SlingShot(this.polygon,{x:100,y:200});

  base = new Ground(390,250,200,20)

  block1 = new Box(330,235,30,40)
  block2 = new Box(360,235,30,40)
  block3 = new Box(390,235,30,40)
  block4 = new Box(420,235,30,40)
  block5 = new Box(450,235,30,40)
  block6 = new Box(360,195,30,40) 
  block7 = new Box(390,195,30,40)
  block8 = new Box(420,195,30,40)
  block9 = new Box(390,155,30,40)


}

function draw() {
  Engine.update(engine);

  if(backgroundImg)
  background(backgroundImg);  
  drawSprites();

  imageMode(CENTER)
  image(polygon_img,polygon.position.x,polygon.position.y,40,40);

  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
  block8.display();
  block9.display();

  base.display();
}

function mouseDragged(){
  if (gameState!=="launched"){
  Matter.Body.setPosition(polygon,{x:mouseX,y:mouseY})
 }
}

function mouseReleased(){
  slingshot.fly()
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
      Matter.Body.setPosition(polygon,{x:200,y:50})
      slingshot.attach(polygon);
      gameState = "onSling"
  }
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=18){
      bg = "grey.png";
  }
  else{
      bg = "white.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}