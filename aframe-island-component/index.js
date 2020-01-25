


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

		switch (data.geometry) { //in this switch i detect the geometry that i want to representate
			case 'box':
				console.log('es un boxx');

				this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
				break;
			case 'cylinder':
				console.log('es un cyylinder');
				radius = Math.sqrt((data.width * data.height) / 3.1415);
				console.log('radius : ' + radius);

				this.geometry = new THREE.CylinderBufferGeometry(radius, radius, data.height);
				break;
			default:
				break;
		}

		this.material = new THREE.MeshStandardMaterial({ color: data.color });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(data.posx, data.posy, data.posz);

		// Set mesh on entity.
		el.setObject3D('mesh', this.mesh);
		console.log(this.data);
		console.log("Pinto una caja");
	},

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) {
		console.log("update");

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
	update: function (oldData) {

	},

	onDataLoaded: function (file) { //in this function i parse the json file and get the objects that i will represent

		console.log('entrando onDataLoaded');

		// create box for each json objet

		var data = this.data;

		console.log(data);

		var elements = JSON.parse(file);

		console.log(elements);


		switch (data.geometry) {
			case "cylinder":
				console.log('es un cylinder!!');
				printCylinders(elements, data.positioning)
				break;

			default:
				console.log('no es un cylinder');
				printBoxes(elements, data.positioning)
				break;
		}
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
		click: function (evt) {
			console.log('This entity was clicked!');
			this.el.setAttribute('material', 'color', 'red');
		}
	}
});

function printBoxes(boxes, positioning) {
	console.log(boxes, positioning);
	switch (positioning) {
		case 'random':
			console.log('es raaaandom');
			BoxesRandomPositions(boxes);
			break;
		case 'four':
			console.log('es four');
			BoxesFourInCircle(boxes);
			break;
		case 'near':
			console.log('es near');
			BoxesNear(boxes);
			break;

		default:
			break;
	}
}

function printCylinders(cylinders, positioning) {
	console.log(cylinders, positioning);
	switch (positioning) {
		case 'random':
			console.log('es raaaandom');
			this.randomPositionsCylinders(cylinders);
			break;
		case 'four':
			console.log('es four');
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

		console.log('<<<<<<<<< pintando nuevo cylinder >>>>>>>>>>');
		console.log(cylinder);

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
		console.log('Numero de boxes : ' + boxes.length + ' Numero de circulos : ' + numcircles);

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

		console.log('<<<<<<<<< pintando nuevo box >>>>>>>>>>');
		console.log(box);

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
	console.log(cylinders);
	var scene = document.querySelector('a-scene');
	const margin = 0.1
	numcircles = Math.ceil(cylinders.length / 4)
	console.log('Numero de cylinders : ' + cylinders.length + ' Numero de circulos : ' + numcircles);

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

		entity.emit('physicscollided', false);

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

	function BoxesNear(parboxesams) {
		//Algoritm to push nearest of the center
		console.log('BoxesNEar');
		
	}

	entity.addEventListener('physicscollided', function (event) {
		console.log('Entity collided with', event.detail.collidingEntity);
		//Ahora deberemos manejar la posición para que no choque con ninguno
	});
}