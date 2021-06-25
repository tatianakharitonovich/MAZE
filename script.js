const start = {};
const end = [];
let way =[];
let isEndNear;

function findWay (array) {
	findStart (array);
	createEnd (array);
	checkEnd ();

	if (!isEndNear) {
		findWayFromStart (array,start);
	}
}

function findWayFromStart (array,start) {
	array[start.y][start.x] = '1';
	let neighbors = getNeighbors(start, array);
	neighbors.map(arr => arr.val='1');
	if (neighbors.length > 0) {
	   	for (let i = 0; i < neighbors.length; i++) {
	   		const current = neighbors[i];
	   		let isSolved;
	   		for (let arr of end) {
	   			if (current.x === arr.x && current.y === arr.y) {
	   				isSolved = true;
	   				array[current.y][current.x] = current.val;
	   				way.push(current.move);
	   				console.log(way);
	   				console.log(array);
	   				return;
	   			}
	   		};
	   		const notVisited = array[current.y][current.x] !== '1';
	   		console.log(notVisited);
	   		console.log(isSolved);
	   		if (isSolved || (notVisited && findWayFromStart(array, current))) {
	   			way.shift(current.move);
	   			return true;
	   		}
	   	}
	   	console.log(way);
	}
	return false;
	console.log('no exit');
}

function findStart (array) {
	array.forEach((arr, y)=> { 
		arr.forEach((item, x)=> {
			if (item==="0") {
				start.x=x;
				start.y=y;
				console.log(start);
			}
	   	})
	});
}

function createEnd (array) {
	array.forEach((arr, y)=> { 
		arr.forEach((item, x)=> {
			if (y===0 || y === array.length-1) {
				end.push({x: x, y: y});
			}

			if (y > 0 && y < array.length-1) {
				if (x === 0 || x === array[0].length-1) {
					end.push({x: x, y: y});
    		   	}
  			}
	   	})
	});
	console.log(end);
}

function checkEnd () {
	end.forEach(arr => {
		if (start.x === arr.x && start.y === arr.y) {
			console.log('exit near');
			isEndNear = true;
			return;
		}
	})
}

function getNeighbors(mas, array) {
	let {x,y} = mas;
	let coords =[];
	coords.push({ x: x, y: y - 1, val: array[y - 1][x], move: 'top'});
    coords.push({ x: x, y: y + 1, val: array[y + 1][x], move: 'bottom'});
    coords.push({ x: x - 1, y: y, val: array[y][x - 1], move: 'left'});
    coords.push({ x: x + 1, y: y, val: array[y][x + 1], move: 'right'});
    return coords.filter((item) => item.val === '+');
}
const maze = [
  ['#','#','#','#','#','#','#','#','#'],
  ['#','+','+','+','#','+','+','+','#'],
  ['#','+','#','+','#','+','#','+','#'],
  ['#','#','#','+','0','+','#','+','#'],
  ['#','#','#','+','#','#','#','#','#'],
  ['#','#','+','+','#','#','#','#','#'],
  ['#','#','+','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#','#','#'],
];

findWay (maze);



