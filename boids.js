let SCREEN_WIDTH = 250;
let SCREEN_HEIGHT = 250;



let boids = [];


function setup() {
  
  //set scene 
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  
  //give the boids a color
  fill(255);
  
  //create the boids
  for (let i = 0; i < 100; i++){
  	boids[i] = new Boid();
  }
  
 
}

function draw(){
	//reset the scene
	background(0);

	//draw the boids
	for (let i = 0; i < boids.length; i++){
  		boids[i].display();
		boids[i].move();
		boids[i].change_direction(boids)
	}
}


class Boid {
  constructor() {
  	//randomaly place the boids to start
    this.x = random(SCREEN_WIDTH);
    this.y = random(SCREEN_HEIGHT);

    //give the boid a random direction to start
    this.direction = createVector(random(-1,1), random(-1,1));

    //outer is 
    this.outer = 200; 
    this.inner = 100;
  }

  move() {

  	//if a boid goes beyond the screen, warp to the other side
  	if (this.x > SCREEN_WIDTH || this.x < 0)
  		this.x = (this.x + SCREEN_WIDTH) % SCREEN_WIDTH;
  	if (this.y > SCREEN_HEIGHT || this.y < 0)
  		this.y = (this.y + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    
    //normalize the direction so the speed is always one
  	let normal = sqrt(this.direction.x ** 2 + this.direction.y ** 2);
    this.x += 2 * this.direction.x / normal;
    this.y += 2 * this.direction.y / normal;

  }

  display() {
  	
  	this.direction.normalize().mult(15);

  	//get the normal vector (in 2D switch the coordinates and negate one)
  	let n = createVector(-this.direction.y, this.direction.x).normalize().mult(3);


    triangle(this.x + this.direction.x, this.y + this.direction.y, 
    	this.x + n.x, this.y + n.y, 
    	this.x - n.x, this.y - n.y);
  }

  change_direction(others){
  	let avg_direction = createVector(0, 0);
  	let avg_seperation = createVector(0, 0);

  	//the boids act normal without cohesion
  	let avg_cohesion = createVector(0, 0);
  	let n = 0;


  	for (let i = 0; i < others.length; i++){
  		let distance_to_other = (this.x - others[i].x) ** 2 + (this.y - others[i].y) ** 2;
  		
  		//if another boid is close add its direction and postion
  		if (distance_to_other < this.outer) {
			avg_direction.add(boids[i].direction);

			avg_cohesion.add(boids[i].x, boids[i].y);
			n++;


			//if a boid is too close add the negative vector representing the position of this boid to that boid
			if (distance_to_other < this.inner) {
				let to = createVector(-boids[i].x + this.x, -boids[i].y + this.y);
				avg_seperation.add(to);
		}
	
	}

	//divide the positions by the number within the radius
	if (n > 0)
		avg_cohesion.div(n);


	//scale the average direction arbitrarily so the boid's don't turn too fast or slow
	avg_cohesion.mult(.02);
	avg_direction.mult(.02);
	avg_seperation.mult(.2);



	//add the averages to the boids
	this.direction = this.direction.add(-avg_cohesion);
  	this.direction = p5.Vector.add(this.direction, avg_direction);
  	this.direction = p5.Vector.add(this.direction, avg_seperation);

  }
}

  	

}






