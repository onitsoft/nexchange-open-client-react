import React, { Component } from 'react';
import styles from './Flip.scss';
import flip from './images/flip.svg';

class Flip extends Component {
  state = { degrees: 0 };

  rotate = () => {
    this.setState({
      degrees: this.state.degrees + 360,
    });
  };

  render() {
    return (
      <div className={`text-center ${styles.container}`}>
        <img
          src={flip}
          alt="Flip pairs"
          className={styles.flip}
          style={{ transform: `rotate(${this.state.degrees}deg)` }}
          onClick={() => this.rotate()}
        />
      </div>
    );
  }
}

export default Flip;
