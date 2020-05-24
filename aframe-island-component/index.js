let searchright = true
let searchbottom = true
let searchleft = true
let searchtop = true
let found = false

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
		let data = this.data;
		let el = this.el;
		let loader = new THREE.TextureLoader();

		switch (data.geometry) { //in this switch i detect the geometry that i want to representate
			case 'box':
				//console.log('es un boxx');

				this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

				if (data.posx == 0 && data.posz == 0) {
					this.material = new THREE.MeshStandardMaterial({ color: data.color });
				} else {
					this.material = new THREE.MeshStandardMaterial({ map: loader.load("../../../assets/imgs/bordecubos.png") });
				}
				break;
			case 'cylinder':
				console.log('es un cyylinder');
				//radius = Math.sqrt((data.width * data.height) / 3.1415); //The same base area
				
				radius = data.width/2//aprox the same radius
				console.log('radius : ' + radius);

				this.geometry = new THREE.CylinderBufferGeometry(radius, radius, data.height,50);

				if (data.posx == 0 && data.posz == 0) {
					this.material = new THREE.MeshStandardMaterial({ color: data.color });
				} else {
					this.material = new THREE.MeshStandardMaterial({ map: loader.load("../../../assets/imgs/whiteblackcircle.png") });
				}
				break;
			default:
				break;
		}

		

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(data.posx, data.height / 2, data.posz);

		// Set mesh on entity.
		el.setObject3D('mesh', this.mesh);
		//console.log(this.data);
		//console.log("Pinto una caja",data.posx, ',', data.posz);
	},
});



AFRAME.registerComponent('islands', {
	schema: {
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
		let data = this.data;
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

		let data = this.data;
		var elem = this.el
		//console.log(data);
		let elements = JSON.parse(file);
		//console.log(elements);
		console.log('iiiiiidddddd');
		
		console.log(elements[0].id);
		

		printBoxes(elements, data.positioning, data.num, elem,data.geometry)

		// switch (data.geometry) {
		// 	case "cylinder":
		// 		//console.log('es un cylinder!!');
		// 		printBoxes(elements, data.positioning)
		// 		break;
		// 	default:
		// 		//console.log('no es un cylinder');
		// 		printBoxes(elements, data.positioning, data.num, elem)
		// 		break;
		// }
	},
});

//-----FUNCTIONS-----

function colocar(scene, depth, height, width, x, z, color) {

	let entity = document.createElement('a-entity');

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

	let objPush = {
		posx: 0,
		posz: Math.abs(box.width / 2),
		len: box.width,
	}
	rightside.push(1)
	rightside.push(objPush)

	let objPush2 = {
		posx: 0,
		posz: -Math.abs(box.width / 2),
		len: box.width,
	}
	leftside.push(1)
	leftside.push(objPush2)

	let objPush3 = {
		posx: Math.abs(box.width / 2),
		posz: 0,
		len: box.width,
	}
	topside.push(1)
	topside.push(objPush3)

	let objPush4 = {
		posx: -Math.abs(box.width / 2),
		posz: 0,
		len: box.width,
	}
	bottomside.push(1)
	bottomside.push(objPush4)

	colocar(scene, box.depth, box.height, box.width, 0, 0, 'red')
}

function printCircles(boxes, scene, topside, bottomside, rightside, leftside) {
	let e2 = {
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
			let objPush = {
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

function printBoxes(boxes, positioning, num, elem,geometry) {
	
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
			BoxesConcentric(boxes, num,elem,geometry);
		default:
			break;
	}
}

function calculatedistance(element, actual){
	console.log('entro en calculatedistance');
	console.log('element : ',element);
	console.log('actual :',actual);
	
	return Math.sqrt(Math.pow(element.posx-actual.posx,2)+Math.pow(element.posz-actual.posz,2));
}

function findnear(actual, rest) {

	console.log('in findnear');
	console.log('actual',actual);
	console.log('rest',rest);

	result = []

	for (let i = 0; i < rest.length; i++) {
		const element = rest[i];
		if(calculatedistance(element,actual) < 6 && element.id != actual.id){
			console.log('esta cercaaa');
			
			result.push(element);
		}
	}
	return result;
}

//returns de (Vx,Vz) unitary vector 
function calculatevector(actual, other) {
	//the vector OA = actual - other

	OA ={
		posx : actual.posx - other.posx ,
		posz : actual.posz - other.posz
	}

}

function bringcloser(actual, other){
	console.log('distancia : ',calculatedistance(actual,other));
	
	delta = calculatedistance(actual,other)-(actual.width/2+other.width/2);
	vector = calculatevector(actual,other) //returns an object, the vector with Vx and Vy
	console.log('vector :',vector);
	
	console.log('delta',delta);
	while (delta>0.05) {

		
	}
	
}

function atractrepulsion(allelements,scene){
	console.log('------>');
	console.log(allelements);
	console.log('<-----');

	for (let i = 0; i < allelements.length; i++) {
		const element = allelements[i]; //the center. around this element we atract the rest that are in a radious of 11
		//filtered = allelements.filter(el => el.distancemiddle )

		filtered = findnear(element, allelements)

		console.log(filtered);

		//in filtered we have the cylinders near us
		//now we have to atract them

		filtered.forEach(near => {
			bringcloser(element,near)
		});
		
		
	}

	let elementid = allelements[0].id
	
	var el = scene.querySelector('#'+elementid);

	console.log(el);

	console.log('width : ',el.getAttribute('width'));
	
	//el.setAttribute('animation', "property: position; to: 1 8 -10");
}



function BoxesConcentric(boxes, num, elem, geometry) {
	//console.log('boxes concentric');
	

	let next = 0;

	let scene = document.querySelector('a-scene');
	let lado = boxes[0].width;

	//think if i need the corners ???

	let e1 = { //upper right
		posx: 0,
		posz: 0
	}
	let e2 = { //down right
		posx: 0,
		posz: 0
	}
	let e3 = { //down left
		posx: 0,
		posz: 0
	}
	let e4 = { // upper left
		posx: 0,
		posz: 0
	}

	//i have one list for each side, one for the rigth, other for the left, other for the top and other for the bottom side.
	//in each array, i save an object that have the position x and y and the length of the segment

	let right = []
	let left = []
	let top = []
	let bottom = []
	let firstcircle = true

	let allelements = []


	//i will go for each elements in the boxes array, placing the elements in concentric circles
	for (let i = 0; i < num ; i++) {

		id = Math.random().toString(36).slice(2); //random alphanumeric
		console.log('id 1: '+id);
		id='a'+id //because the id cant start with number
		console.log('id 2: '+id);


		console.log('----------------------------------------------------');
		console.log( 'i : ', i);

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

						posx = right[next-1].x - right[next-1].len / 2 - box.width / 2

						if ((right[next].z + right[next].len/2)<=(right[next-1].z - right[next-1].len/2)) {
							console.log('es mayor el anterior');
							posz = parseFloat(right[next-1].z) - parseFloat(right[next-1].len / 2) + parseFloat(box.width / 2)
						}else{
							console.log('es mayor el actual');
							posz = parseFloat(right[next].z) + parseFloat(right[next].len / 2) + parseFloat(box.width / 2)
						}
						length = box.width

						objpush = {
							x: posx,
							z: posz,
							len: length
						}

						console.log(right[next]);
						
						let xaux = bottom[0].x
						let zaux = bottom[0].z
						let lenaux = bottom[0].len
												
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
					
					if (bottom[next + 1] != undefined && (Math.abs((bottom[next-1].z - bottom[next-1].len/2) - (bottom[next].z - bottom[next].len/2)))>=box.width) { //fits
						console.log('fits');

						posx = bottom[next].x - bottom[next].len / 2 - box.width / 2



						if ((bottom[next].x - bottom[next].len/2)>bottom[next-1].x+bottom[next-1].len/2) {
							posx = bottom[next-1].x + bottom[next-1].len / 2 - box.width / 2
						}
						

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
					if (left[next] != undefined && (Math.abs((left[next].x + left[next].len/2) - (left[next-1].x + left[next-1].len/2))) >= box.width) { //fits
						console.log('fits');
						
						posx = left[next - 1].x + left[next - 1].len/2 + box.width/2
						posz = left[next].z-left[next].len/2-box.width/2

						if (Math.abs((parseFloat(left[next].z)-parseFloat(left[next].len/2)))<Math.abs(((left[next-1].z+left[next-1].len/2)))&&(next!=1)) {
							console.log('el anterior está más a la izquierda');
							console.log('next',parseFloat(left[next].z)-parseFloat(left[next].len/2));
							
							posz = left[next-1].z+left[next-1].len/2-box.width/2

						}

						console.log(Math.abs((left[next].z-left[next].len/2)));
						console.log(Math.abs(((left[next-1].z-left[next-1].len/2))));
						
						

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
						if (left[next + 1] != undefined){
							console.log('Entro por el dont fits or undefined');

							console.log(Math.abs((left[next].x + left[next].len/2) - (left[next-1].x + left[next-1].len/2)));
							
							

							console.log(left[next].x+left[next].len/2,' : Parte de arriba del actual');
							console.log(left[next-1].x+left[next-1].len/2,' : Parte de arriba del anterior');
							console.log(box.width);
							

						}

						
						

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

							if (Math.abs((left[next].x - left[next].len/2)-(left[next-1].x+left[next-1].len/2))>=box.width) {
								console.log('fits');

								posx = left[next - 1].x + left[next -1].len/2 + box.width/2
								posz = left[next].z-left[next].len/2-box.width/2
								if (Math.abs((parseFloat(left[next].z)-parseFloat(left[next].len/2)))<Math.abs(((left[next-1].z-left[next-1].len/2)))) {
									console.log('el anterior está más a la izquierda');
									
									posz = left[next-1].z+left[next-1].len/2-box.width/2

								}
								
							}else{
								console.log(left[next].x);
								console.log(left[next-1].x+left[next-1].len/2);
								console.log(Math.abs(left[next].x-(left[next-1].x+left[next-1].len/2)));
								
								posx = left[next - 1].x + left[next - 1].len/2 + box.width/2
								posz = left[next + 1 ].z-left[next + 1].len/2-box.width/2
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
						console.log('fits in the next position');
						
						posx = top[next].x + top[next].len/2 + box.width/2
						posz = top[next-1].z + top[next-1].len/2 + box.width/2

						if (((top[next-1].x) - (top[next-1].len/2))>(top[next].x) + (top[next].len/2)) {
							posx = top[next-1].x - top[next-1].len/2 + box.width/2

						}

						console.log('position :', posx ,',',posz);
						console.log('next :',next);

						if (next == top.length-1) {
							console.log('the last element of top');
							posx = top[next-1].x - top[next-1].len/2 + box.width/2
							
							top.pop()
							objpush = {
								x: posx,
								z: posz,
								len: box.width
							}
							top.push(objpush)
							
						}else{

							//replace the old object with the new one
							top[next].x = posx
							top[next].z = posz
							top[next].len = box.width

						}

					}else{

						if (top[next + 1] == undefined) { //is the last element
							console.log('the last element');

							posx = top[next-1].x+top[next-1].len/2-box.width/2
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

		console.log('el id es : ' + id);

		elempush = {
			id : id,
			distancemiddle : Math.sqrt(Math.pow(posx,2)+Math.pow(posz,2)),
			width : box.width,
			posx : posx,
			posz: posz
		}
		
		allelements.push(elempush);

		let entity = document.createElement('a-entity');
		entity.setAttribute('id',id);
		entity.setAttribute('newisland', {
			'depth': box.depth,
			'height': box.height,
			'width': box.width,
			'posx': posx,
			'posz': posz,
			'color': color,
			'geometry':geometry,
		});
		elem.appendChild(entity);
		console.log('top');
		console.log(top);
		console.log('right');
		console.log(right);
		console.log('bottom');
		console.log(bottom);
		console.log('left');
		console.log(left);
	}
	//All the elements has been placed in the scene, in the second iteration i'm going to apply the attract-repulsion algorithm 
	
	atractrepulsion(allelements,scene);
	

} 