import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class BoxGeometry extends Component {
  componentDidMount() {
    const {
      scene,
      name,
      color,
      wireframe,
      width,
      height,
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      recieveShadow
    } = this.props;

    const geometry = new THREE.BoxGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color, wireframe });
    let box = new THREE.Mesh(geometry, material);

    box.position.x = positionX;
    box.position.y = positionY;
    box.position.z = positionZ;
    box.rotation.x = rotationX;
    box.rotation.y = rotationY;
    box.rotation.z = rotationZ;
    box.recieveShadow = recieveShadow;

    if (name) {
      box.name = name;
    }

    scene.add(box);
  }

  render() {
    return null;
  }
}

BoxGeometry.defaultProps = {
  color: 0xffffff,
  width: 1,
  height: 1,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  recieveShadow: false,
  wireframe: false
};

BoxGeometry.propTypes = {
  scene: PropTypes.object.isRequired,
  name: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  recieveShadow: PropTypes.bool,
  wireframe: PropTypes.bool
};

export default BoxGeometry;
