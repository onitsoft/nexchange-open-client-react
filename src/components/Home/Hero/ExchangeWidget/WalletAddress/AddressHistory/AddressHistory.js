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
          this.props.history.map((order, index) => (
            <div
            className={`${styles.entry}`} key={index + order.withdraw_address}
            onMouseDown={() => this.handleClick(order.withdraw_address)}>
              {order.withdraw_address}
              <div className={`${styles.details}`}>{`(${order.quote}) Last user X days ago`}</div>
            </div>
          ))
        }
        <div className={`${styles.separator}`}></div>
      </div>
    );
  }
}

export default AddressHistory;
