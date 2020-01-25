

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n/**\n * Island component for A-Frame.\n */\n\n\nAFRAME.registerComponent('island', {\n  schema: {},\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {},\n\n  /**\n   * Called when component is attached and when component data changes.\n   * Generally modifies the entity based on the data.\n   */\n  update: function (oldData) {},\n\n  /**\n   * Called when a component is removed (e.g., via removeAttribute).\n   * Generally undoes all modifications to the entity.\n   */\n  remove: function () {},\n\n  /**\n   * Called on each scene tick.\n   */\n  // tick: function (t) { },\n\n  /**\n   * Called when entity pauses.\n   * Use to stop or remove any dynamic or background behavior such as events.\n   */\n  pause: function () {},\n\n  /**\n   * Called when entity resumes.\n   * Use to continue or add any dynamic or background behavior such as events.\n   */\n  play: function () {},\n\n  /**\n   * Event handlers that automatically get attached or detached based on scene state.\n   */\n  events: {// click: function (evt) { }\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
	throw new Error('Component attempted to register before AFRAME was available.');
  }
  
  /**
   * Island component for A-Frame.
   */
AFRAME.registerComponent('newisland', {
	schema: {
		depth: {type: 'number', default: 1},
		height: {type: 'number', default: 1},
		width: {type: 'number', default: 1},
		color: {type: 'color', default: '#FFFFFF'}
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


		this.geometry = new THREE.BoxBufferGeometry(data.width,data.height,data.depth);

		this.material = new THREE.MeshStandardMaterial({color: data.color});

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		// Set mesh on entity.
		el.setObject3D('mesh', this.mesh);


	 },
  
	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) { },
  
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
		console.log('estoy ejecutando el dist');
		
		var self = this;

		this.loader = new THREE.FileLoader();
	 },
	

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) {
		const data = this.data;

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
  