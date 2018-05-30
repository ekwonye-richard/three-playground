import React, { Component, Fragment } from 'react';
import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols';

class Scene extends Component {
  constructor() {
    super();

    this.state = {};
    this.threeWrapper = null;
    this.animate = this.animate.bind(this);
    this.resetDimensions = this.resetDimensions.bind(this);
  }

  animate() {
    const { onAnimate, hasOrbitControls } = this.props;
    requestAnimationFrame(this.animate);
    onAnimate && onAnimate();
    hasOrbitControls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  resetDimensions() {
    if (this.props.fullScreen) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
  
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
  }

  componentDidMount() {
    const { fullScreen, width, height, background, showMapEnabled, hasOrbitControls, disableZoom } = this.props;
    
    const CANVAS_WIDTH = fullScreen ? window.innerWidth : width;
    const CANVAS_HEIGHT = fullScreen ? window.innerHeight : height;
    
    this.scene = new THREE.Scene();

    if (background) {
      this.scene.background = new THREE.Color( background );;
    }

    this.camera = new THREE.PerspectiveCamera( 45, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
    this.camera.position.z = 5; 
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    
    if (hasOrbitControls) {
      this.controls = new Orbitcontrols( this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = !disableZoom;
    }

    if (showMapEnabled) {
      this.renderer.showMapEnabled = showMapEnabled;
    }

    this.threeWrapper.appendChild(this.renderer.domElement);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.setState({ addChildren: true });

    this.animate();
    window.addEventListener('resize', this.resetDimensions);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.resetDimensions);
  }

  render() {
    const { children } = this.props;
    const { addChildren } = this.state;

    return (
      <Fragment>
        <div ref={e => this.threeWrapper = e} />
        {addChildren && children(this.scene)}
      </Fragment>
    );
  }
}

export default Scene;
