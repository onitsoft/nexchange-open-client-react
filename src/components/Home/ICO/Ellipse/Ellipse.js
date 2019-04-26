import React, { Component } from 'react';
import styles from './Ellipse.scss';

class Ellipse extends Component {
  state = {
    top: 0,
    left: 0,
  };

  componentDidMount = () => {
    setTimeout(this.updatePos, 0);
  };

  updatePos = () => {
    this.setState({
      top: 200 * (Math.random() > 0.5 ? -1 : 1),
      left: 200 * (Math.random() > 0.5 ? -1 : 1),
    });

    this.timeout = setTimeout(this.updatePos, Math.random() * (2500 - 1500) + 1500);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className={`${styles.container} hidden-xs`} style={this.props.style}>
        <div
          className={styles.ellipse}
          style={{
            width: this.props.style.width,
            height: this.props.style.height,
            transform: `translate(${this.state.top}px, ${this.state.left}px)`,
          }}
        >
          <img src={`Img/ellipses/${this.props.coin}.svg`} alt="LTC" />
        </div>
      </div>
    );
  }
}

export default Ellipse;
