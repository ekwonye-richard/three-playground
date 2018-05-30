import React, { Component, Fragment } from 'react';
import * as THREE from 'three';
import {
  Scene,
  SpotLight,
  AmbientLight,
  BoxGeometry
} from '../../components/three-components';

const BLACK = 'black';
const BLUE = 'blue';

class CollisionExample extends Component {
  constructor() {
    super();

    this.state = {};
    this.mainScene = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.checkForCollision = this.checkForCollision.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    if (!this.mainScene || this.state.isOver) {
      return;
    }

    const scene = this.mainScene.getScene();
    let blackBox = scene.getObjectByName('black-box');
    let blueBox = scene.getObjectByName('blue-box');
    const increment = 0.05;

    switch (e.keyCode) {
      case 65:
        blackBox.position.x -= increment;
        this.checkForCollision(BLACK);
        break;
      case 68:
        blackBox.position.x += increment;
        this.checkForCollision(BLACK);
        break;
      case 87:
        blackBox.position.y += increment;
        this.checkForCollision(BLACK);
        break;
      case 83:
        blackBox.position.y -= increment;
        this.checkForCollision(BLACK);
        break;
      case 74:
        blueBox.position.x -= increment;
        this.checkForCollision(BLUE);
        break;
      case 76:
        blueBox.position.x += increment;
        this.checkForCollision(BLUE);
        break;
      case 73:
        blueBox.position.y += increment;
        this.checkForCollision(BLUE);
        break;
      case 75:
        blueBox.position.y -= increment;
        this.checkForCollision(BLUE);
        break;
      default:
        break;
    }
  }

  checkForCollision(color) {
    const scene = this.mainScene.getScene();
    const blackBox = scene.getObjectByName('black-box');
    const blueBox = scene.getObjectByName('blue-box');

    const blackBoxPosition = new THREE.Box3().setFromObject(blackBox);
    const blueBoxPosition = new THREE.Box3().setFromObject(blueBox);

    if (blackBoxPosition.intersectsBox(blueBoxPosition)) {
      if (color === BLUE) {
        blueBox.scale.set(2, 2, 2);
        scene.remove(blackBox);
      } else {
        blackBox.scale.set(2, 2, 2);
        scene.remove(blueBox);
      }
      this.setState({ isOver: true });
    }
  }

  render() {
    return (
      <Scene
        ref={e => (this.mainScene = e)}
        hasOrbitControls={true}
        fullScreen={true}
        background="#F5F6FB"
      >
        {scene => {
          return (
            scene && (
              <Fragment>
                <SpotLight scene={scene} />
                <AmbientLight scene={scene} />
                <BoxGeometry
                  scene={scene}
                  color="#000000"
                  name="black-box"
                  positionX={-1}
                  rotationX={0.3}
                  rotationY={0.6}
                />
                <BoxGeometry
                  scene={scene}
                  color="#3F73CD"
                  name="blue-box"
                  positionX={2}
                  rotationX={0.3}
                  rotationY={0.6}
                />
              </Fragment>
            )
          );
        }}
      </Scene>
    );
  }
}

export default CollisionExample;
