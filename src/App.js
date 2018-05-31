import React, { Component, Fragment } from 'react';
import {
  Scene,
  Model,
  SpotLight,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  BoxGeometry
} from './components/three-components';
import CollisionExample from './containers/CollisionExample';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.mainScene = null;
    this.animateModel = this.animateModel.bind(this);
  }

  animateModel() {
    if (this.mainScene) {
      const scene = this.mainScene.getScene();
      let model = scene.getObjectByName('main-model');

      if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <CollisionExample />

        <Scene
          ref={e => (this.mainScene = e)}
          // onAnimate={this.animateModel}
          fullScreen={true}
          background="#ffffff"
          hasOrbitControls={false}
        >
          {scene => {
            return (
              <Fragment>
                <SpotLight scene={scene} />
                <AmbientLight scene={scene} />
                {/* <PlaneGeometry
                color="#0088aa"
                width={10}
                height={10}
                rotationX={-510}
                rotationY={-60}
                recieveShadow={true}
              /> */}
                <Model
                  name="main-model"
                  objUrl="shared/Hipster-Glasses-ThePixelLab.obj"
                  mtlUrl="shared/Hipster-Glasses-ThePixelLab.mtl"
                  scale={0.007}
                  scene={scene}
                />
              </Fragment>
            );
          }}
        </Scene>
      </div>
    );
  }
}

export default App;
