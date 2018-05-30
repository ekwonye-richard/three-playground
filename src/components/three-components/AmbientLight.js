import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class AmbientLight extends Component {
  componentDidMount() {
    const { scene, color } = this.props;

    let ambientLight = new THREE.AmbientLight(color);
    scene.add(ambientLight);
  }

  render() {
    return null;
  }
}

AmbientLight.defaultProps = {
  color: 0xffffff
};

AmbientLight.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AmbientLight;
