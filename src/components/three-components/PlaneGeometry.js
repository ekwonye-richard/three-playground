import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three'

class PlaneGeometry extends Component {
  componentDidMount() {
    const { scene, color, width, height, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, recieveShadow } = this.props;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial( {color, side: THREE.DoubleSide} );

    let plane = new THREE.Mesh( geometry, material );

    plane.position.x = positionX;
    plane.position.y = positionY;
    plane.position.z = positionZ;
    plane.rotation.x = rotationX;
    plane.rotation.y = rotationY;
    plane.rotation.z = rotationZ;
    plane.recieveShadow = recieveShadow;
    scene.add(plane)
  }

  render() {
    return null;
  }
}

PlaneGeometry.defaultProps = {
  color: 0xffffff,
  shininess: 100,
  width: 1,
  height: 1,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  recieveShadow: false
}

PlaneGeometry.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  recieveShadow: PropTypes.bool
};

export default PlaneGeometry;
