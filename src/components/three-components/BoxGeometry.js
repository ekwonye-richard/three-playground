import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class BoxGeometry extends Component {
  componentDidMount() {
    const {
      scene,
      group,
      name,
      color,
      wireframe,
      width,
      height,
      depth,
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      scale,
      recieveShadow
    } = this.props;

    const geometry = new THREE.BoxGeometry(width, height, depth);
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

    if (scale) {
      box.scale.set(scale, scale, scale);
    }

    if (scene) {
      scene.add(box);
    } else if (group) {
      group.add(box);
    }
  }

  render() {
    return null;
  }
}

BoxGeometry.defaultProps = {
  color: 0xffffff,
  width: 1,
  height: 1,
  depth: 1,
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
  scene: PropTypes.object,
  group: PropTypes.object,
  name: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  scale: PropTypes.number,
  recieveShadow: PropTypes.bool,
  wireframe: PropTypes.bool
};

export default BoxGeometry;
