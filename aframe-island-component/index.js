
AFRAME.registerComponent('newisland', {
	schema: {
		depth: {type: 'number', default: 1},
		height: {type: 'number', default: 1},
		width: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFFFFF'},
        isfirst: {type: 'number', default: 0}
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

        if(data.isfirst != 0 && posx.toString() != NaN.toString()){
            console.log("inicializo if");
            
            var posx = 2;
            var posy = 0;
            var posz = 0;
        }else{
            
            if(posx == undefined){
                console.log("inicializo else");
                var posx = 2;
                var posy = 0;
                var posz = 0;
            }
            console.log("añado");
            
            posx = posx + 2;
        }


        var scene = new THREE.Scene;
        

		var geometry = new THREE.BoxBufferGeometry(data.width,data.height,data.depth);

		var material = new THREE.MeshStandardMaterial({color: data.color});

        var mesh = new THREE.Mesh(geometry,material);
        

        mesh.position.set(posx,posy,posz);

		// Set mesh on entity.
        el.setObject3D('mesh', mesh);


        //scene.add(mesh);
        

        console.log("Pinto una caja");

        console.log("Posición x : " + posx);

        
        
        


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
	 },
	

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) {
		var data = this.data;

		if (data.databox && data.databox !== oldData.databox) {
			this.loader.load(data.databox, this.onDataLoaded.bind(this));
		  }

	 },

	 onDataLoaded: function (file) {
		  // ... create box for each data
		var self = this;
		var data = this.data;
		var depth = data.depth;
		var height = data.height;
		var width = data.width;

		var entity = document.createElement('a-box');
		entity.setAttribute( 'depth', data.depth);
		entity.setAttribute( 'height', data.height);
		entity.setAttribute( 'width', data.width);
		this.el.appendChild(entity);

		var boxes = JSON.parse(file);
		for (let box of boxes) {
			entity = document.createElement('a-box');
			entity.setAttribute('databox', {
			'depth': box['depth'],
			'height': box['height'],
			'width': box['width']
			});
			this.el.appendChild(entity);
		};
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
  