import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three'

class DirectionalLight extends Component {
  componentDidMount() {
    const { scene, color, intensity, castShadow } = this.props;

    let directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(0, 50, 0)

    if (castShadow) {
      directionalLight.castShadow = castShadow;
      directionalLight.shadowMapWidth = 2048;
      directionalLight.shadowMapHeight = 2048;
    }

    scene.add(directionalLight)
  }

  render() {
    return null;
  }
}

DirectionalLight.defaultProps = {
  color: 0xffffff,
  intensity: 1,
  castShadow: false
}

DirectionalLight.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  intensity: PropTypes.number,
  castShadow: PropTypes.bool
};

export default DirectionalLight;
