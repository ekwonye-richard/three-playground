import React, { Component, Fragment } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import {
  Scene,
  SpotLight,
  AmbientLight,
  BoxGeometry,
  SphereGeometry,
  Group,
  tweenProps
} from '../../components/three-components';

const BLACK = 'black';
const GOLD = 'gold';

class CollisionExample extends Component {
  constructor() {
    super();

    this.state = {
      blackdave: 0,
      ekene: 0
    };

    this.mainScene = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.restart = this.restart.bind(this);
    this.checkForCollision = this.checkForCollision.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  restart() {
    const scene = this.mainScene.getScene();
    const blackGroup = scene.getObjectByName('black-group');
    const goldGroup = scene.getObjectByName('gold-group');

    blackGroup.scale.set(1, 1, 1);
    blackGroup.position.set(-0.5, 0, 0);
    goldGroup.scale.set(1, 1, 1);
    goldGroup.position.set(0.5, 0, 0);

    this.setState({ isOver: false });
  }

  onKeyDown(e) {
    if (!this.mainScene || this.state.isOver) {
      return;
    }

    const scene = this.mainScene.getScene();
    let blackGroup = scene.getObjectByName('black-group');
    let goldGroup = scene.getObjectByName('gold-group');
    const increment = 0.05;

    switch (e.keyCode) {
      case 65:
        blackGroup.position.x -= increment;
        this.checkForCollision(BLACK);
        break;
      case 68:
        blackGroup.position.x += increment;
        this.checkForCollision(BLACK);
        break;
      case 87:
        blackGroup.position.y += increment;
        this.checkForCollision(BLACK);
        break;
      case 83:
        blackGroup.position.y -= increment;
        this.checkForCollision(BLACK);
        break;
      case 74:
        goldGroup.position.x -= increment;
        this.checkForCollision(GOLD);
        break;
      case 76:
        goldGroup.position.x += increment;
        this.checkForCollision(GOLD);
        break;
      case 73:
        goldGroup.position.y += increment;
        this.checkForCollision(GOLD);
        break;
      case 75:
        goldGroup.position.y -= increment;
        this.checkForCollision(GOLD);
        break;
      default:
        break;
    }
  }

  scaleUp(obj) {
    tweenProps({
      position: { scale: 1 },
      target: { scale: 1.5 },
      duration: 500,
      easing: TWEEN.Easing.Elastic.InOut,
      onUpdate: ({ scale }) => obj.scale.set(scale, scale, scale)
    });
  }

  checkForCollision(color) {
    const scene = this.mainScene.getScene();
    const blackGroup = scene.getObjectByName('black-group');
    const goldGroup = scene.getObjectByName('gold-group');

    const blackGroupPosition = new THREE.Box3().setFromObject(blackGroup);
    const goldGroupPosition = new THREE.Box3().setFromObject(goldGroup);

    if (blackGroupPosition.intersectsBox(goldGroupPosition)) {
      if (color === GOLD) {
        this.scaleUp(goldGroup);
        blackGroup.scale.set(0, 0, 0);
        this.setState({ ekene: this.state.ekene + 1 });
      } else {
        this.scaleUp(blackGroup);
        goldGroup.scale.set(0, 0, 0);
        this.setState({ blackdave: this.state.blackdave + 1 });
      }
      this.setState({ isOver: true });
    }
  }

  render() {
    const { blackdave, ekene, isOver } = this.state;

    return (
      <Fragment>
        <Scene
          ref={e => (this.mainScene = e)}
          hasOrbitControls={true}
          fullScreen={true}
          background="#F5F6FB"
        >
          {scene => {
            return (
              <Fragment>
                <SpotLight scene={scene} />
                <AmbientLight scene={scene} />
                <Group
                  name="black-group"
                  scene={scene}
                  scale={0.9}
                  positionX={-0.5}
                >
                  {group => {
                    return (
                      <Fragment>
                        <BoxGeometry
                          group={group}
                          color="#000000"
                          width={2}
                          height={0.2}
                          depth={0.2}
                          positionX={-1}
                        />
                        <SphereGeometry
                          group={group}
                          color="#000000"
                          radius={1}
                          width={8}
                          height={6}
                          scale={0.22}
                        />
                      </Fragment>
                    );
                  }}
                </Group>
                <Group
                  name="gold-group"
                  scene={scene}
                  scale={0.9}
                  positionX={0.5}
                >
                  {group => {
                    return (
                      <Fragment>
                        <BoxGeometry
                          group={group}
                          color="#D4AF37"
                          width={2}
                          height={0.2}
                          depth={0.2}
                          positionX={2}
                        />
                        <SphereGeometry
                          group={group}
                          color="#D4AF37"
                          radius={1}
                          width={8}
                          height={6}
                          scale={0.22}
                          positionX={1}
                        />
                      </Fragment>
                    );
                  }}
                </Group>
              </Fragment>
            );
          }}
        </Scene>
        <div className="game-data">
          <div className="title">
            <code>Snake Wars™</code>
          </div>
          <div className="score-board">
            <code>Blackdave: {blackdave}</code> <br />
            <code>Ekene: {ekene}</code>
          </div>
          <div className="controls left-controls">
            <div className="group-name">
              <code>Blackdave</code>
            </div>
            <code className="keyboard up">W</code>
            <code className="keyboard left">A</code>
            <code className="keyboard down">S</code>
            <code className="keyboard right">D</code>
          </div>
          <div className="controls right-controls">
            <div className="group-name">
              <code>Ekene</code>
            </div>
            <code className="keyboard up">I</code>
            <code className="keyboard left">J</code>
            <code className="keyboard down">K</code>
            <code className="keyboard right">L</code>
          </div>
          <div className="instructions">
            <code>Click and drag to rotate camera</code> <br />
            <code>Scroll to zoom</code> <br />
            <code>Left and Right keys to position camera</code> <br />
          </div>
        </div>
        {isOver && (
          <div className="restart">
            <code onClick={this.restart}>Restart</code>
          </div>
        )}
      </Fragment>
    );
  }
}

export default CollisionExample;
