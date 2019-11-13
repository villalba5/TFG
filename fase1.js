//import data from './file1.json';

AFRAME.registerComponent('island', {
    schema: {
      id: {type: 'number', default: 0},
      depth: {type: 'number', default: 1},
      height: {type: 'number', default: 1},
      width: {type: 'number', default: 1},
      datapoints: {type: 'asset'}
    },

    init: function () {
      var self = this;

      this.loader = new THREE.FileLoader();
    },

    update: function (oldData) {
      var self = this;

      const data = this.data;
      // Nothing changed
      if (AFRAME.utils.deepEqual(oldData, data)) {
        return;
      }
      if (data.datapoints && data.datapoints !== oldData.datapoints) {
        this.loader.load(data.datapoints, this.onDataLoaded.bind(this));
      }
    },

    onDataLoaded: function (file) {
      var self = this;
      const data = this.data;
      const depth = data.depth;
      const height = data.height;
      const width = data.width;

      var entity = document.createElement('a-box');
      entity.setAttribute( 'depth', data.depth);
      entity.setAttribute( 'height', data.depth);
      entity.setAttribute( 'width', data.depth);
      this.el.appendChild(entity);

      var datapoints = JSON.parse(file);
      for (let point of datapoints) {
        entity = document.createElement('a-box');
        entity.setAttribute('datapoint', {
          'depth': point['depth'],
          'height': point['height'],
          'width': point['width']
        });
        this.el.appendChild(entity);
      };
    }
});