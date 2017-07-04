var cols, rows;
var w = 40;
var grid = [];

var current;

var stack = [];

function setup(){
	createCanvas(800,800);
	cols = floor(width/w);
	rows = floor(height/w);
	// frameRate(5);

	for(var y = 0; y < rows; y++){
		for(var x = 0; x < cols; x++){
			var cell = new Cell(x, y);
			grid.push(cell);
		}
	}

	current = grid[0];

}

function draw(){
	background(51);
	for(var x = 0; x < grid.length; x++){
		grid[x].show();
	}
	current.visited = true;
	current.highlight();
	//STEP 1
	var next =  current.checkNeighbours();
	if(next){
		next.visited = true;
		//STEP 2
		stack.push(current);
		console.log(stack);
		//STEP 3
		removeWalls(current, next);
		//STEP 4
		current = next;
	} else if (stack.length > 0){
			current = stack.pop();
	}
}

function index(x, y){
	if(x < 0 || y < 0 || x > cols-1 || y > rows-1){
		return -1;
	}
	return x + y * cols;
}

function Cell(x, y){
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true]; //Top, Right, Bottom, Left
	this.visited = false;

	this.checkNeighbours = function(){
		var neighbours = [];

		var top = grid[index(x, y - 1)];
		var right = grid[index(x + 1, y)];
		var bottom = grid[index(x, y + 1)];
		var left = grid[index(x - 1, y)];

		if(top && !top.visited){
			neighbours.push(top);
		}
		if(right && !right.visited){
			neighbours.push(right);
		}
		if(bottom && !bottom.visited){
			neighbours.push(bottom);
		}
		if(left && !left.visited){
			neighbours.push(left);
		}

		if(neighbours.length > 0){
			var r = floor(random(0, neighbours.length));
			return neighbours[r];
		} else{
			return undefined;
		}
	}
	this.highlight = function(){
		var x = this.x * w;
		var y = this.y * w;
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	}

	this.show = function(){
		var x = this.x * w;
		var y = this.y * w;
		stroke(255);
		if(this.walls[0]){
			line(x, y, x+w, y);
		}
		if(this.walls[1]){
			line(x+w, y, x+w, y+w);
		}
		if(this.walls[2]){
			line(x+w, y+w, x, y+w);
		}
		if(this.walls[3]){
			line(x, y+w, x, y);
		}

		if(this.visited){
			noStroke();
			fill(255, 0, 255, 100);
			rect(x, y, w, w);
		}
	}
}

function removeWalls(a, b){
	var x = a.x - b.x;
	if(x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	} else if(x === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.y - b.y;
	if(y === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	} else if(y === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
}