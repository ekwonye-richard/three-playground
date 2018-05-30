import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import MTLLoader from 'three-mtl-loader';
import OBJLoader from 'three-obj-loader';

// Enter node_modules/three-mtl-loader and run npm install three@latest --save to update it.

class Model extends Component {
  constructor() {
    super();

    this.setProps = this.setProps.bind(this);
  }

  componentDidMount() {
    const { objUrl, mtlUrl, name } = this.props;
    const threeLoader = THREE;
    OBJLoader(threeLoader);
    let mtlLoader = new MTLLoader();
    const setProps = this.setProps;

    mtlLoader.load(mtlUrl, function(materials) {
      materials.preload();

      let objLoader = new threeLoader.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objUrl, function(object) {
        object.name = name;
        setProps(object, true);
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { scene, name } = this.props;

    if (prevProps !== this.props) {
      let object = scene.getObjectByName(name);
      this.setProps(object);
    }
  }

  setProps(object, initialRender) {
    const {
      scene,
      scale,
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      castShadow
    } = this.props;

    object.position.x = positionX;
    object.position.y = positionY;
    object.position.z = positionZ;
    object.rotation.x = rotationX;
    object.rotation.y = rotationY;
    object.rotation.z = rotationZ;
    object.castShadow = castShadow;
    scale && object.scale.set(scale, scale, scale);
    initialRender && scene.add(object);
  }

  render() {
    return null;
  }
}

Model.defaultProps = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  castShadow: false
};

Model.propTypes = {
  scene: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  objUrl: PropTypes.string.isRequired,
  mtlUrl: PropTypes.string.isRequired,
  scale: PropTypes.number,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  castShadow: PropTypes.bool
};

export default Model;
