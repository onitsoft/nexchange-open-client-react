import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import styles from './AddressHistory.scss';

class AddressHistory extends Component {
  handleClick(address) {
    this.props.setAddress(address);
  }

  render() {
    return (
      <div className={`${styles.container}`}>
        {this.props.history &&
          this.props.history.map((address, index) => (
            <div className={`${styles.entry}`} key={index + address} onMouseDown={() => this.handleClick(address)}>{address}</div>
          ))
        }
      </div>
    );
  }
}

export default AddressHistory;
