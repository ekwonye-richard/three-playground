import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class SpotLight extends Component {
  componentDidMount() {
    const {
      scene,
      color,
      positionX,
      positionY,
      positionZ,
      intensity
    } = this.props;

    let spotLight = new THREE.SpotLight(color, intensity);
    spotLight.position.set(positionX, positionY, positionZ);
    scene.add(spotLight);
  }

  render() {
    return null;
  }
}

SpotLight.defaultProps = {
  color: 0xffffff,
  positionX: 100,
  positionY: 100,
  positionZ: 100,
  intensity: 1
};

SpotLight.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  intensity: PropTypes.number
};

export default SpotLight;
