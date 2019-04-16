import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { fetchOrder } from 'Actions';


import styles from './DepositModal.scss';



class DepositModal extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      show: false,
      order: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ order: nextProps.order, show: nextProps.show });
    }
  }

  render() {
    if(this.state.loading) {
      return (<div></div>);
    }
    
    const order = this.props.order;
    return (
      <I18n ns="translations">
        {t => (
          <Modal show={this.state.show} onHide={this.props.onClose}>
            <div id="my-orders" className={`${styles['modal-content']} modal-content`}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
                  <i className="material-icons">clear</i>
                </button>
              </div>
              <div className={`${styles['modal-body']} modal-body`}>
                {order 
                  ? <div>
                      <p>{`Unique Reference: ${order.unique_reference}`}</p>
                      {order.withdraw_address ?
                      <p>{`Withdraw Address: ${order.withdraw_address.address} 
                      (${order.withdraw_address.currency_code})`}</p>
                      : null}
                      {order.deposit_address ?
                      <p>{`Deposit Address: ${order.deposit_address.address} 
                      (${order.deposit_address.currency_code})`}</p>
                      : null}
                      {order.status_name && order.status_name[0][1] === 'INITIAL' ? 
                      <span>{`In order to complete your order, send 
                      ${order.order_type === 'BUY' || order.order_type === 1 ? 
                      parseFloat(order.amount_quote) : parseFloat(order.amount_base)} 
                      ${order.deposit_address.currency_code}
                      to the deposit address`}</span>
                      : null}
                    </div> 
                  : null}
              </div>
            </div>
          </Modal>
        )}
      </I18n>);
  }
}

const mapStateToProps = ({ order }) => ({ order });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchOrder }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositModal);
