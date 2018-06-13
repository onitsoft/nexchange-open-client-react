import React, { Component } from 'react';
import OrderStatusFiat from './OrderStatusFiat/OrderStatusFiat';
import OrderStatusCrypto from './OrderStatusCrypto/OrderStatusCrypto';
import STATUS_CODES from 'StatusCodes';
import styles from './OrderStatus.scss';

class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    let width = '0%';
    const status = this.props.status;

    if (STATUS_CODES[status] === 'COMPLETED') {
      width = '100%';
    } else if (STATUS_CODES[status] === 'RELEASE') {
      width = '90%';
    } else if (STATUS_CODES[status] === 'PRE_RELEASE') {
      width = '75%';
    } else if (STATUS_CODES[status] === 'PAID') {
      width = '66.6%';
    } else if (STATUS_CODES[status] === 'PAID_UNCONFIRMED') {
      width = '33.3%';
    } else if (STATUS_CODES[status] === 'INITIAL') {
      width = '33.3%';
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className={styles.container}>
            {this.props.isFiat ? <OrderStatusFiat status={this.props.status} /> : <OrderStatusCrypto status={this.props.status} />}

            <div className={`${styles['progress-container']}`}>
              <div className={`${styles['line-info']} progress`}>
                <div className={`${styles['bar-info']} progress-bar`} role="progressbar" style={{ width: width }}>
                  <span className="sr-only">{width} Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStatus;
