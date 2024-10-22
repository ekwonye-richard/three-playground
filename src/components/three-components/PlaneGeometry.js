import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class PlaneGeometry extends Component {
  componentDidMount() {
    const {
      scene,
      group,
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
      scale,
      recieveShadow
    } = this.props;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe,
      side: THREE.DoubleSide
    });

    let plane = new THREE.Mesh(geometry, material);

    plane.position.x = positionX;
    plane.position.y = positionY;
    plane.position.z = positionZ;
    plane.rotation.x = rotationX;
    plane.rotation.y = rotationY;
    plane.rotation.z = rotationZ;
    plane.recieveShadow = recieveShadow;

    if (name) {
      plane.name = name;
    }

    if (scale) {
      plane.scale.set(scale, scale, scale);
    }

    if (scene) {
      scene.add(plane);
    } else if (group) {
      group.add(plane);
    }
  }

  render() {
    return null;
  }
}

PlaneGeometry.defaultProps = {
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

PlaneGeometry.propTypes = {
  scene: PropTypes.object,
  group: PropTypes.object,
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
  scale: PropTypes.number,
  recieveShadow: PropTypes.bool,
  wireframe: PropTypes.bool
};

export default PlaneGeometry;
