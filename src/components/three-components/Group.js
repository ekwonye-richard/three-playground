import { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Group extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const {
      scene,
      name,
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      scale
    } = this.props;

    this.group = new THREE.Group();

    this.group.position.x = positionX;
    this.group.position.y = positionY;
    this.group.position.z = positionZ;
    this.group.rotation.x = rotationX;
    this.group.rotation.y = rotationY;
    this.group.rotation.z = rotationZ;

    if (name) {
      this.group.name = name;
    }

    if (scale) {
      this.group.scale.set(scale, scale, scale);
    }

    scene.add(this.group);
    this.setState({ addChildren: true });
  }

  render() {
    const { children } = this.props;
    const { addChildren } = this.state;

    return addChildren ? children(this.group) : null;
  }
}

Group.defaultProps = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0
};

Group.propTypes = {
  scene: PropTypes.object.isRequired,
  name: PropTypes.string,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  positionZ: PropTypes.number,
  rotationX: PropTypes.number,
  rotationY: PropTypes.number,
  rotationZ: PropTypes.number,
  scale: PropTypes.number
};

export default Group;
