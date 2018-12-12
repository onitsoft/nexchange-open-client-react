import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Flip.scss';
import flip from './images/flip.svg';
import flip_desktop from './images/flip_desktop.svg';
import { switchPairs } from 'Actions/index.js';

class Flip extends Component {
  state = { degrees: 0 };

  rotate = () => {
    this.props.switchPairs();

    this.setState({
      degrees: this.state.degrees + 360,
    });
  };

  render() {
    return (
      <div className="col-xs-12 col-sm-2">
        <div className={`text-center ${styles.container}`}>
          <div className="visible-xs">
            <img
              src={flip}
              alt="Flip pairs"
              className={styles.flip}
              style={{ transform: `rotate(${this.state.degrees}deg)` }}
              onClick={() => this.rotate()}
            />
          </div>

          <div className="visible-sm visible-md visible-lg">
            <img
              src={flip_desktop}
              alt="Flip pairs"
              className={styles.flip}
              style={{ transform: `rotate(${this.state.degrees}deg)` }}
              onClick={() => this.rotate()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ switchPairs }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Flip);
