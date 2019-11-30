## aframe-island-component

[![Version](http://img.shields.io/npm/v/aframe-island-component.svg?style=flat-square)](https://npmjs.org/package/aframe-island-component)
[![License](http://img.shields.io/npm/l/aframe-island-component.svg?style=flat-square)](https://npmjs.org/package/aframe-island-component)

A Island component for A-Frame.

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-island-component@1.0.0/dist/aframe-island-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity island="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-island-component
```

Then require and use.

```js
require('aframe');
require('aframe-island-component');
```
