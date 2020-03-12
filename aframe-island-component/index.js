var searchright = true
var searchbottom = true
var searchleft = true
var searchtop = true
var found = false

AFRAME.registerComponent('newisland', {
	schema: {
		depth: { type: 'number', default: 1 },
		height: { type: 'number', default: 1 },
		width: { type: 'number', default: 1 },
		color: { type: 'color', default: '#00ffff' },
		posx: { type: 'number', default: 0 },
		posy: { type: 'number', default: 0 },
		posz: { type: 'number', default: 0 },
		geometry: { type: 'string', default: 'box' }
	},

	/**
	 * Set if component needs multiple instancing.
	 */
	multiple: false,

	/**
	 * Called once when component is attached. Generally for initial setup.
	 */
	init: function () {
		var data = this.data;
		var el = this.el;
		var loader = new THREE.TextureLoader();

		switch (data.geometry) { //in this switch i detect the geometry that i want to representate
			case 'box':
				//console.log('es un boxx');

				this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
				break;
			case 'cylinder':
				//console.log('es un cyylinder');
				radius = Math.sqrt((data.width * data.height) / 3.1415);
				//console.log('radius : ' + radius);

				this.geometry = new THREE.CylinderBufferGeometry(radius, radius, data.height);
				break;
			default:
				break;
		}

		if (data.posx == 0 && data.posz == 0) {
			this.material = new THREE.MeshStandardMaterial({ color: data.color });
		} else {
			this.material = new THREE.MeshStandardMaterial({ map: loader.load("../../../assets/imgs/bordecubos.png") });
		}

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(data.posx, data.height / 2, data.posz);

		// Set mesh on entity.
		el.setObject3D('mesh', this.mesh);
		//console.log(this.data);
		//console.log("Pinto una caja",data.posx, ',', data.posz);
	},

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) {

	},

	/**
	 * Called when a component is removed (e.g., via removeAttribute).
	 * Generally undoes all modifications to the entity.
	 */
	remove: function () { },

	/**
	 * Called on each scene tick.
	 */
	// tick: function (t) { },

	/**
	 * Called when entity pauses.
	 * Use to stop or remove any dynamic or background behavior such as events.
	 */
	pause: function () { },

	/**
	 * Called when entity resumes.
	 * Use to continue or add any dynamic or background behavior such as events.
	 */
	play: function () { },

	/**
	 * Event handlers that automatically get attached or detached based on scene state.
	 */
	events: {
		// click: function (evt) { }
	}
});



AFRAME.registerComponent('islands', {
	schema: {
		id: { type: 'number', default: Math.floor(Math.random() * 1000000) + 1 }, //random number between 1 and 1.000.000
		depth: { type: 'number', default: 1 },
		height: { type: 'number', default: 1 },
		width: { type: 'number', default: 1 },
		databox: { type: 'asset' },
		positioning: { type: 'string', default: 'random' },
		geometry: { type: 'string', default: 'box' },
		num: { type: 'number', default: 1 },
	},

	/**
	 * Set if component needs multiple instancing.
	 */
	multiple: false,

	/**
	 * Called once when component is attached. Generally for initial setup.
	 */
	init: function () {
		//Load de json file
		this.loader = new THREE.FileLoader();
		var data = this.data;
		if (data.databox) {
			this.loader.load(data.databox, this.onDataLoaded.bind(this));
		}
	},

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */

	onDataLoaded: function (file) { //in this function i parse the json file and get the objects that i will represent

		console.log('entrando onDataLoaded');

		// create box for each json objet

		var data = this.data;
		//console.log(data);
		var elements = JSON.parse(file);
		//console.log(elements);

		switch (data.geometry) {
			case "cylinder":
				//console.log('es un cylinder!!');
				printCylinders(elements, data.positioning)
				break;
			default:
				//console.log('no es un cylinder');
				printBoxes(elements, data.positioning, data.num)
				break;
		}
	},
});


AFRAME.registerComponent('concentricislands', {

	schema: {
		height: { type: 'number', default: 1 },
		area: { type: 'number', default: 1 },
		databox: { type: 'asset' },
		geometry: { type: 'string', default: 'box' }
	},
	init: function () {
		//Load de json file
		this.loader = new THREE.FileLoader();
		var data = this.data;
		if (data.databox) {
			this.loader.load(data.databox, this.onDataLoaded.bind(this));
		}
	},



	onDataLoaded: function (file) { //in this function i parse the json file and get the objects that i will represent

		var rightside = []
		var leftside = []
		var topside = []
		var bottomside = []


		console.log('entrando onDataLoaded');

		// create box for each json objet

		var data = this.data;
		console.log(data);

		//console.log(data);
		var elements = JSON.parse(file);
		console.log(elements);

		var scene = document.querySelector('a-scene');

		printFirst(elements[0], scene, rightside, leftside, topside, bottomside); //print the first element in the center of the scene

		console.log(rightside);


		printCircles(elements, scene, rightside, leftside, topside, bottomside);
	},
});





//-----FUNCTIONS-----

function colocar(scene, depth, height, width, x, z, color) {

	var entity = document.createElement('a-entity');

	entity.setAttribute('newisland', {
		'color': color,
		'depth': depth,
		'height': height,
		'width': width,
		'posx': x,
		'posz': z,
		'geometry': 'box'
	});
	scene.appendChild(entity);

}

function printFirst(box, scene, rightside, leftside, topside, bottomside) {
	console.log('printFirst');

	var objPush = {
		posx: 0,
		posz: Math.abs(box.width / 2),
		len: box.width,
	}
	rightside.push(1)
	rightside.push(objPush)

	var objPush = {
		posx: 0,
		posz: -Math.abs(box.width / 2),
		len: box.width,
	}
	leftside.push(1)
	leftside.push(objPush)

	var objPush = {
		posx: Math.abs(box.width / 2),
		posz: 0,
		len: box.width,
	}
	topside.push(1)
	topside.push(objPush)

	var objPush = {
		posx: -Math.abs(box.width / 2),
		posz: 0,
		len: box.width,
	}
	bottomside.push(1)
	bottomside.push(objPush)

	colocar(scene, box.depth, box.height, box.width, 0, 0, 'red')
}

function printCircles(boxes, scene, topside, bottomside, rightside, leftside) {
	var e2 = {
		x: 0,
		z: 0,
		next: 0
	}

	for (let i = 1; i < boxes.length; i++) { //i starts in 1 because the first box is placed
		const box = boxes[i];

		if (box.width <= rightside[rightside[0].len]) { //the box fits in the rigth side
			posx = rightside[0].width / 2 - box.width / 2
			posz = rightside[0].width / 2 + box.width / 2
			e2.x = -box.width / 2
			e2.z = rightside[0].width / 2 + box.width
			colocar(scene, box.depth, box.height, box.width, posx, posz, 'green')
			rightside.splice(rightside[0], 1)
			var objPush = {
				posx: posx,
				posz: posz,
				len: box.width,
			}
			rightside.push(objPush)
			rightside[0]++

		} else {
			console.log('vuelta completada :) ');

		}
	}
}

function printBoxes(boxes, positioning, num) {
	console.log(boxes, positioning);
	switch (positioning) {
		case 'random':
			//console.log('es raaaandom');
			BoxesRandomPositions(boxes);
			break;
		case 'four':
			//console.log('es four');
			BoxesFourInCircle(boxes);
			break;
		case 'near':
			//console.log('es near');
			BoxesNear(boxes);
			break;
		case 'much':
			//console.log('es much');
			BoxesConcentric(boxes, num);
		default:
			break;
	}
}

function printCylinders(cylinders, positioning) {
	console.log(cylinders, positioning);
	switch (positioning) {
		case 'random':
			//console.log('es raaaandom');
			this.randomPositionsCylinders(cylinders);
			break;
		case 'four':
			//console.log('es four');
			this.fourincircleCylinders(cylinders);
			break;

		default:
			break;
	}
}

function randomPositionsCylinders(cylinders) {

	var scene = document.querySelector('a-scene');

	cylinders.forEach(function (cylinder) {

		var posx = Math.floor(Math.random() * 11) * Math.pow(-1, Math.floor(Math.random() * 2))
		var posz = Math.floor(Math.random() * 11) * Math.pow(-1, Math.floor(Math.random() * 2))

		//console.log('<<<<<<<<< pintando nuevo cylinder >>>>>>>>>>');
		//console.log(cylinder);

		var entity = document.createElement('a-entity');

		entity.setAttribute('newisland', {
			'color': 'blue',
			'depth': cylinder.depth,
			'height': cylinder.height,
			'width': cylinder.width,
			'posx': posx,
			'posz': posz,
			'geometry': 'cylinder'
		});
		scene.appendChild(entity);
	});
}


function BoxesFourInCircle(boxes) {
	//in this function i'm going to place the first box in the center and the next in concentric circles, 4 for circle

	var scene = document.querySelector('a-scene');
	const margin = 0.1

	for (let index = 0; index < boxes.length; index++) {
		const box = boxes[index];
		numcircles = Math.ceil(boxes.length / 4)
		//console.log('Numero de boxes : ' + boxes.length + ' Numero de circulos : ' + numcircles);

		switch (index) { //the first box in the middle
			case 0:
				posx = 0
				posz = 0
				break;
			case 1:
				posx = 0
				posz = boxes[0].depth / 2 + margin + boxes[index].depth / 2
				break
			case 2:
				posz = 0
				posx = -(boxes[0].width / 2) - margin - boxes[index].width / 2
				break
			case 3:
				posx = 0
				posz = -(boxes[0].depth / 2) - margin - boxes[index].depth / 2
				break
			case 4:
				posz = 0
				posx = (boxes[0].width / 2) + margin + boxes[index].width / 2
				break
			default:
				console.log('error en el switch de los index four in circle');
				break;
		}
		var entity = document.createElement('a-entity');

		entity.emit('physicscollided', false);

		entity.setAttribute('newisland', {
			'depth': box.depth,
			'height': box.height,
			'width': box.width,
			'posx': posx,
			'posz': posz
		});
		scene.appendChild(entity);
	}

	entity.addEventListener('physicscollided', function (event) {
		console.log('Entity collided with', event.detail.collidingEntity);
		//Ahora deberemos manejar la posición para que no choque con ninguno
	});
}

function BoxesRandomPositions(boxes) {

	var scene = document.querySelector('a-scene');

	boxes.forEach(function (box) {

		var posx = Math.floor(Math.random() * 11) * Math.pow(-1, Math.floor(Math.random() * 2))
		var posz = Math.floor(Math.random() * 11) * Math.pow(-1, Math.floor(Math.random() * 2))

		//console.log('<<<<<<<<< pintando nuevo box >>>>>>>>>>');
		//console.log(box);

		var entity = document.createElement('a-entity');

		entity.setAttribute('newisland', {
			'color': 'blue',
			'depth': box.depth,
			'height': box.height,
			'width': box.width,
			'posx': posx,
			'posz': posz
		});
		scene.appendChild(entity);
	});

}

function fourincircleCylinders(cylinders) {
	//console.log(cylinders);
	var scene = document.querySelector('a-scene');
	const margin = 0.1
	numcircles = Math.ceil(cylinders.length / 4)
	//console.log('Numero de cylinders : ' + cylinders.length + ' Numero de circulos : ' + numcircles);

	radius = []

	for (let index = 0; index < cylinders.length; index++) {
		const cylinder = cylinders[index];
		radius.push(Math.sqrt((cylinders[index].width * cylinders[index].height) / 3.1415)); //Array os radius

		switch (index) { //the first cylinder in the middle
			case 0:
				posx = 0
				posz = 0
				break;
			case 1:
				posx = 0
				posz = radius[0] + margin + radius[index]
				break
			case 2:
				posz = 0
				posx = -(radius[0]) - margin - radius[index]
				break
			case 3:
				posx = 0
				posz = -(radius[0]) - margin - radius[index]
				break
			case 4:
				posz = 0
				posx = radius[0] + margin + radius[index]
				break
			default:
				console.log('error en el switch de los index four in circle');
				break;
		}
		var entity = document.createElement('a-entity');

		entity.setAttribute('newisland', {
			'depth': cylinder.depth,
			'height': cylinder.height,
			'width': cylinder.width,
			'posx': posx,
			'posz': posz,
			'geometry': 'cylinder'
		});
		scene.appendChild(entity);
	}
}

function BoxesNear(parboxesams) {
	//Algoritm to push nearest of the center
	//console.log('BoxesNear');

}

function BoxesConcentric(boxes, num) {
	//console.log('boxes concentric');

	var next = 0;

	var scene = document.querySelector('a-scene');
	var lado = boxes[0].width;

	//think if i need the corners ???

	var e1 = { //upper right
		posx: 0,
		posz: 0
	}
	var e1posz = 0
	var e2 = { //down right
		posx: 0,
		posz: 0
	}
	var e2posx = 0
	var e3 = { //down left
		posx: 0,
		posz: 0
	}
	var e3posz = 0
	var e4 = { // upper left
		posx: 0,
		posz: 0
	}
	var e4posx = 0

	//i have one list for each side, one for the rigth, other for the left, other for the top and other for the bottom side.
	//in each array, i save an object that have the position x and y and the length of the segment

	var right = []
	var left = []
	var top = []
	var bottom = []
	var firstcircle = true




















	//i will go for each elements in the boxes array, placing the elements in concentric circles
	for (let i = 0; i < num ; i++) {

		console.log('----------------------------------------------------');
		
		found = false
		const box = boxes[i];
		color = '#00ffff' //light blue

		if (i == 0) { //if is the first box, it will be in the center
			posx = 0
			posz = 0
			color = 'red'
		} else { //if not it will be in concentric circles around the center
			if (firstcircle) {
				console.log('paso firstcircle');

				if (Math.abs(e2.posx) < lado / 2) { // Check the right side
					console.log('comprobando primera circunferencia a la derecha');

					posz = lado / 2 + box.width / 2;
					if (e2.posx == 0) { //only the first time
						posx = lado / 2 - box.width / 2
						e2.posx = posx - box.width / 2
					} else {
						posx = e2.posx - box.width / 2
					}
					e2.posz = parseFloat(lado / 2) + parseFloat(box.width);
					e2.posx = posx - box.width / 2

					objpush = {
						x: posx,
						z: posz,
						len: box.width,
					}
					right.push(objpush)
					console.log('rigth');
					console.log(right);

					if (Math.abs(e2.posx) > lado) { //if the element is greather than the center box side , we must save the other side in the bottom
						bottom.push(objpush)
					}

				} else if (Math.abs(e3.posz) <= lado / 2) {
					console.log('search firstcircle bottom');
					
					posx = -lado / 2 - box.width / 2
					if (e3.posx == 0) {
						posz = lado / 2 - box.width / 2
					} else {
						posz = e3.posz - box.width / 2
					}
					e3.posx = posx - box.width / 2
					e3.posz = posz - box.width / 2
					if (Math.abs(e3.posz) > lado / 2) { //if the element is greather than the side box, we must save the other side in the bottom
						posx = bottom[bottom.length-1].x - bottom[bottom.length-1].len/2 + box.width/2
						objpush = {
							x: posx,
							z: posz,
							len: box.width,
						}
						left.push(objpush)
					}
					objpush = {
						x: posx,
						z: posz,
						len: box.width,
					}

					bottom.push(objpush)
					console.log('bottom');
					console.log(bottom);

					
				} else if ((e4.posx) <= lado / 2) {
					console.log('search firstcircle left');
					console.log(left.length);
					

					posz = -lado / 2 - box.width / 2
					if (left.length == 1) {
						console.log('paso if');
						
						//only first time
						posx = left[left.length-1].x + left[left.length-1].len/2 + box.width/2
						e4.posx = box.width - lado/2
						
					} else {
						console.log('paso else');
						
						
						posx = left[left.length-1].x + left[left.length-1].len/2 + box.width/ 2
						console.log('posx : ',e4.posx);

						e4.posx = box.width + e4.posx
						console.log('width : ', box.width);
						console.log('posx : ',e4.posx);
						
						
						console.log('nueva e4 posx : ',e4.posx);
						
					}
					e4.posz = -lado - box.width
					objpush = {
						x: posx,
						z: posz,
						len: box.width,
					}
					console.log(e4.posx,'---------->>>>>>>>>>>>>>>');

					left.push(objpush)
					console.log('left');
					console.log(left);



					if (Math.abs(e4.posx) > lado / 2) { //if the element is greather than the side box, we must save the other side in the bottom
						console.log('esquina mayor que cuadrado');
						console.log(e4.posx);
						
						top.push(objpush)
					}
				} else if (Math.abs(e1.posz) <= lado / 2) {
					console.log('search firstcircle top');

					posx = lado / 2 + box.width / 2
					if (e1.posx == 0) { //only the first time3
						posz = -lado / 2 + box.width / 2
					} else {
						posz = e1.posz + box.width / 2
					}
					e1.posx = posx + box.width / 2
					e1.posz = posz + box.width / 2

					objpush = {
						x: posx,
						z: posz,
						len: box.width,
					}
					top.push(objpush)
					console.log('top');
					console.log(top);

					if (Math.abs(e1.posz) > lado / 2) { //if the element is greather than the side box, we must save the other side in the bottom
						right.unshift(objpush)
					}
				} else {
					console.log('fin primer circulito');

					// i only pass the first time

					firstcircle = false
					posx = right[next].x + right[next].len / 2 - box.width / 2
					posz = right[next].z + right[next].len / 2 + box.width / 2
					length = right[next].len

					objpush = {
						x: posx,
						z: posz,
						len: length
					}

					console.log(top);
					

					top.push(objpush)

					console.log('top');
					
					console.log(top);
					console.log(next);
					right.splice(0,1) //remove the first element
					right.unshift(objpush) //add in the begginin
					
					next++

				}


			} else {










				//i'm not in the first circle
				console.log('circunferencias concéntricas');
				console.log(next, 'next');
				

				if (searchright) {
					console.log('buscando en right');
					if (right[next] != undefined && ((right[next-1].x - right[next-1].len/2) - (right[next].x - right[next].len/2))>=box.width) { //fits	
						console.log('paso if fits');

						posx = right[next].x + right[next].len / 2 - box.width / 2
						posz = parseFloat(right[next].z) + parseFloat(right[next].len / 2) + parseFloat(box.width / 2)
						length = box.width

						objpush = {
							x: posx,
							z: posz,
							len: length
						}

						console.log(right[next]);
						
						var xaux = bottom[0].x
						var zaux = bottom[0].z
						var lenaux = bottom[0].len
												

						//update the object
						right[next].x = posx
						right[next].z = posz
						right[next].len = length

						console.log(right[next]);
						
						bottom[0].x = xaux
						bottom[0].z = zaux
						bottom[0].len = lenaux

						console.log(bottom[0]);
					
						if (right[next + 1] == undefined) {
							console.log('next == undefined');
							posx = right[next-1].x - right[next-1].len/2 - box.width/2
							posz = right[next].z + right[next].len / 2 + box.width / 2

							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}

							right.splice(right.length-1,1)
							right.push(objpush)
							bottom.unshift(objpush)
						}

						next++

					} else { //if dont fits we search the position of the next element
						console.log('paso elseeeeeeeee');					
						console.log('el ancho de la caja : ',box.width);
						
						

						if (right[next + 1] != undefined) { //if dont fit in the box, got the z of the next box
							console.log('pasoooooo if');
							console.log('parte baja de la primera caja : ',right[next-1].x - right[next-1].len/2);
							console.log('parte baja de la segunda caja : ',(right[next].x - right[next].len/2));
							
							
							console.log('el hueco entre la anterior caja y la siguiente : ', ((right[next-1].x - right[next-1].len/2) - (right[next].x - right[next].len/2)));

							console.log(Math.abs((Math.abs(right[next-1].x) - Math.abs(right[next-1].len/2)) - (Math.abs(right[next].x) - Math.abs(right[next].len/2))));

							
							posx = right[next-1].x - right[next-1].len/2 - box.width/2
							posz = right[next + 1].z + right[next + 1].len / 2 + box.width / 2
							length = box.width
							console.log(length);

							right[next].x = posx
							right[next].z = posz
							right[next].len = length
							
							next++

						} else if (right[next] == undefined) {

							console.log('paso undefined');
							

							//if its undefined there are no more elements and we have to put it the last
							posx = posx - right[next-1].len / 2 - box.width / 2
							posz = posz - right[next-1].len / 2 + box.width / 2

							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}
							console.log('es undefined');
							console.log(posx, posz);

							bottom.splice(0,1)
							bottom.unshift(objpush)
							right.push(objpush)
							searchright = false
							next = 1//for the next circle
						}else{
							//dont fits
							console.log('else :) :) ');
							console.log(Math.abs((Math.abs(right[next-1].x) - Math.abs(right[next-1].len/2)) - (Math.abs(right[next].x) - Math.abs(right[next].len/2))));

							
						}
					}

				} else if (searchbottom) {
					console.log('buscando en bottom');

					if (bottom[next + 1] != undefined && bottom[next].len >= box.width) { //fits
						console.log('fits');

						posx = bottom[next].x - bottom[next].len / 2 - box.width / 2
						posz = bottom[next-1].z - bottom[next-1].len / 2 - box.width / 2

						//console.log(bottom[next]);
						
						//update the object
						bottom[next].x = posx
						bottom[next].z = posz
						bottom[next].len = box.width
						
						//console.log(bottom[next]);
						
					} else {
						//dont fits
						console.log('paso por el else, dont fits');
						if (bottom[next + 1]==undefined) {
							console.log('el next es undefined');
							//console.log(next);

							//console.log('next.len',bottom[next-1].len/2);
							
							posx = bottom[next-1].x + bottom[next-1].len/2 - box.width / 2
							posz = bottom[next-1].z - bottom[next-1].len/2 - box.width / 2
							console.log(posx, 'x',posz,'z');

							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}

							if ((posz - box.width/2) < (left[0].z - left[0].len/2)) {
								console.log('me paso de la esquina');
								
								left.unshift(objpush)

								searchbottom = false
								next = 0
							}else{
								console.log('elimino el ultimo y añado el mio');
								
								bottom.splice(bottom.length-1,1)
							}
							
							bottom.push(objpush)
						}else{
							//dont fits
							console.log('paso else bottom :( ');
							if (((bottom[next-1].z+bottom[next-1].len/2) - box.width) <= (bottom[next].z+bottom[next].len/2)) {
								//fits
								console.log('fits');
								posx = bottom[next].x-bottom[next].len/2-box.width/2
								posz = bottom[next-1].z-bottom[next-1].len/2-box.width/2

								console.log('x : ',posx);
								

								bottom[next].x = posx
								bottom[next].z = posz
								bottom[next].len = box.width
								
								
							}else{
								console.log('dont fits');
								console.log(((bottom[next-1].z+bottom[next-1].len/2) - box.width));
								console.log((bottom[next].z+bottom[next].len/2));
								

							}
							
						}
					}
					next ++
				} else if (searchleft) {
					console.log('estoy en searchleft :)');
					if (left[next] != undefined && left[next].len >= box.width) { //fits
						console.log('fits');
						
						posx = left[next - 1].x + left[next - 1].len/2 + box.width/2
						posz = left[next].z-left[next].len/2-box.width/2

						xaux = top[0].x
						zaux = top[0].z
						lenaux = top[0].len

						left[next].x = posx
						left[next].z = posz
						left[next].len = box.width

						top[0].x = xaux
						top[0].z = zaux
						top[0].len = lenaux

						if (next + 1== left.length) {
							console.log('es el ultimo');
							
							//is the last
							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}
							left.splice(left.length-1,1)
							left.push(objpush)
							top.unshift(objpush)
						}
						
					}else{
						if (left[next + 1] == undefined) { //is the last element
							console.log('the last --->');

							console.log(next,'next');
							

							posx = left[next-1].x+left[next-1].len/2+box.width/2
							posz = left[next-1].z+left[next-1].len/2-box.width/2

							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}

							left.push(objpush)
							top.splice(0,1) //for delete the first item
							top.unshift(objpush)
							searchleft = false
							next = 0
							
						}else{ //it dont fits
							console.log('dont fits :(');

							if (Math.abs((left[next].x + left[next].len/2)-(left[next-1].x+left[next-1].len/2))>=box.width) {
								console.log('fits');

								posx = left[next - 1].x + left[next -1].len/2 + box.width/2
								posz = left[next].z-left[next].len/2-box.width/2

								
							}else{
								console.log(left[next].x);
								console.log(left[next-1].x+left[next-1].len/2);
								
								
								console.log(Math.abs(left[next].x-(left[next-1].x+left[next-1].len/2)));
								
								posx = left[next - 1].x + left[next - 1].len/2 + box.width/2
								posz = left[next + 1].z-left[next + 1].len/2-box.width/2
							}

							left[next].x = posx
							left[next].z = posz
							left[next].len = box.width
							
						}
					}
					next++
					

				} else if (searchtop) {
						xx = right[0].x
						zz = right[0].z
						leen = right[0].len
						console.log('x :',xx, 'z :',zz,'len :',leen);
					console.log('searchtoppp ->>>>>>>>>>');
					if (top[next] != undefined && Math.abs(((top[next-1].z) + (top[next-1].len/2)) - ((top[next].z) + (top[next].len/2))) >= box.width) { //fits
						
						posx = top[next].x + top[next].len/2 + box.width/2
						posz = top[next-1].z + top[next-1].len/2 + box.width/2

						console.log('old : ', top[next]);

						console.log('x :',xx, 'z :',zz,'len :',leen);

						
						

						//replace the old object with the new one
						top[next].x = posx
						top[next].z = posz
						top[next].len = box.width

						console.log('x :',xx, 'z :',zz,'len :',leen);



						
						

						right[0].x=xx
						right[0].z=zz
						right[0].len=leen

						console.log('new : ',top[next].x);

					}else{

						if (top[next + 1] == undefined) { //is the last element
							console.log('the last element');

							posx = top[next-1].x-top[next-1].len/2+box.width/2
							posz = top[next-1].z + top[next-1].len/2 + box.width/2

							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}

							if (posz +box.width/2 > right[0].z+right[0].len/2) {
								console.log('Paso por este iffff');
								
								top.push(objpush)
								right.unshift(objpush)

								console.log('los pongo todos a true');
								// console.log('las cajas : ',top[next-1].z + box.width/2);
								// console.log('la esquina : ', right[0].z+right[0].len/2);

								searchright = true
								searchbottom = true
								searchleft = true
								searchtop = true
								next = 0
							}else{
								console.log('Paso por este eeeelseeee');
								
								top.splice(top.length-1,1) //for delete the first item
								top.push(objpush)
							}
						}else{
							console.log('dont fits :(');
							console.log('donde hay que meterlo : ', Math.abs(((top[next-1].z) + (top[next-1].len/2)) - ((top[next].z) + (top[next].len/2))));
							console.log('lado : ',box.width);

							posx = parseFloat(top[next + 1].x) + parseFloat(top[next + 1].len/2) + parseFloat(box.width/2)
							posz = top[next - 1].z + top[next - 1].len/2 + box.width/2

							top[next].x = posx
							top[next].z = posz
							top[next].len = box.width
						}
					}
					next++
				} 
			}

		}
		console.log(searchright);

		console.log(posx, posz, 'i : ', i);

		var entity = document.createElement('a-entity');
		entity.setAttribute('newisland', {
			'depth': box.depth,
			'height': box.height,
			'width': box.width,
			'posx': posx,
			'posz': posz,
			'color': color,
		});
		scene.appendChild(entity);
		console.log('top');
		console.log(top);
		console.log('right');
		console.log(right);
		console.log('bottom');
		console.log(bottom);
		console.log('left');
		console.log(left);
	}
} 