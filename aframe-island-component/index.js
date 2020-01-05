//import data from './file1.json';


AFRAME.registerComponent('newisland', {
	schema: {
		depth: {type: 'number', default: 1},
		height: {type: 'number', default: 1},
		width: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFFFFF'},
		isfirst: {type: 'number', default: 0},
		
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
		
		try {
			if(data.isfirst != 0){
				console.log("inicializo if");
				
				var posx = 0;
				var posy = 0;
				var posz = 0;
			}else{
				if(posx == undefined){
					console.log("inicializo else");
					var posx = 2;
					var posy = 0;
					var posz = 0;
				}
				console.log('sumo 2 a la x');
				
				posx = posx + 2;
			}
			
		} catch (error) {
			//Si paso por aqui es porque no se ha entrado ninguna vez
		}
        

		this.geometry = new THREE.BoxBufferGeometry(data.width,data.height,data.depth);

		this.material = new THREE.MeshStandardMaterial({color: data.color});

        this.mesh = new THREE.Mesh(this.geometry,this.material);
        

		this.mesh.position.set(posx,posy,posz);
		console.log('pos x -> ' + posx);
		console.log('pos y -> ' + posy);
		console.log('pos z -> ' + posz);

		// Set mesh on entity.
        el.setObject3D('mesh', this.mesh);


		//scene.add(mesh);
		
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
		id: {type: 'number', default: Math.floor(Math.random()*1000000)+1}, //random number between 1 and 1.000.000
		depth: {type: 'number', default: 1},
		height: {type: 'number', default: 1},
		width: {type: 'number', default: 1},
		databox: {type: 'asset'}
	},
  
	/**
	 * Set if component needs multiple instancing.
	 */
	multiple: false,
  
	/**
	 * Called once when component is attached. Generally for initial setup.
	 */
	init: function () {
		var self = this;

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
		console.log('Entrando en update');
		
	 },

	 onDataLoaded: function (file) {

		console.log('entrando onDataLoaded');
		

		  // ... create box for each data
		var self = this;
		var data = this.data;
		var scene = document.querySelector('a-scene');
		console.log(data);
		
		var boxes = JSON.parse(file);

		console.log(boxes);
		

		boxes.forEach(function(box) {
			console.log('<<<<<<<<< pintando nuevo box >>>>>>>>>>' );
			console.log(box);
			
			
			isfirst = 0;

			var entity = document.createElement('a-entity');

			if (box.id == '001') {
				console.log('es el primero');
				
				isfirst = 1;
			}

			console.log(isfirst);
			

			entity.setAttribute('newisland', {
				'color': 'blue',
				'depth': box.depth,
				'height': box.height,
				'width': box.width,
				'isfirst': isfirst
			  });
			  scene.appendChild(entity);
		});
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
  