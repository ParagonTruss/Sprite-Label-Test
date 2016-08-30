/*import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';*/
var React = require('react');
var React3 = require('react-three-renderer');
var THREE = require('three');
var ReactDOM = require('react-dom');

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
  }
  
  componentDidMount() {
	var text = "Hello world";
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var metrics = context.measureText( text );
    var textWidth = metrics.width;

    context.font = "18px arial Bold";
    context.fillStyle = "rgba(255,0,0,1)";
    context.strokeStyle = "rgba(255,0,0,1)";
    context.lineWidth = 4;

    context.fillText( text, 0, 0);

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    this.spriteMaterial.map = texture;
    this.spriteMaterial.useScreenCoordinates = false;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
	
	var position = new THREE.Vector3(0, 0, 10);
    var scale = new THREE.Vector3(100,50,1);

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <sprite position={position} scale={scale} ref={(sprite) => this.sprite = sprite}>
          <spriteMaterial ref={(spriteMaterial) => this.spriteMaterial = spriteMaterial}></spriteMaterial>
        </sprite>
      </scene>
    </React3>);
  }
}

ReactDOM.render(<Simple/>, document.querySelector('.root-anchor'));