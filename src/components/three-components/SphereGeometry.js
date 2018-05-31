import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class SphereGeometry extends Component {
  componentDidMount() {
    const {
      scene,
      group,
      name,
      color,
      wireframe,
      radius,
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

    const geometry = new THREE.SphereGeometry(radius, width, height);
    const material = new THREE.MeshBasicMaterial({ color, wireframe });
    let sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = positionX;
    sphere.position.y = positionY;
    sphere.position.z = positionZ;
    sphere.rotation.x = rotationX;
    sphere.rotation.y = rotationY;
    sphere.rotation.z = rotationZ;
    sphere.recieveShadow = recieveShadow;

    if (name) {
      sphere.name = name;
    }

    if (scale) {
      sphere.scale.set(scale, scale, scale);
    }

    if (scene) {
      scene.add(sphere);
    } else if (group) {
      group.add(sphere);
    }
  }

  render() {
    return null;
  }
}

SphereGeometry.defaultProps = {
  color: 0xffffff,
  radius: 1,
  width: 8,
  height: 6,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  recieveShadow: false,
  wireframe: false
};

SphereGeometry.propTypes = {
  scene: PropTypes.object,
  group: PropTypes.object,
  name: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.number,
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

export default SphereGeometry;
