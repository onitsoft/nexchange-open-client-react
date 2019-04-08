import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { fetchOrder } from 'Actions';
import config from 'Config';

import styles from './DepositModal.scss';



class DepositModal extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      show: false,
      order: null
    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ order: nextProps.order, show: nextProps.show });
    }

    this.timeout = setTimeout(() => {
      this.props.fetchOrder(this.props.order.unique_reference);
    }, config.ORDER_DETAILS_FETCH_INTERVAL);

    if (nextProps.order !== 429) {
      this.setState({ order: nextProps.order });

      if (
        this.props.order &&
        this.props.order.status_name.length > 0 &&
        this.props.order.status_name[0][0] === 11 &&
        nextProps.order.status_name[0][0] === 12
      ) {
        window.gtag('event', 'Order paid', {event_category: 'Order Book', event_label: `${nextProps.order.unique_reference}`});
      }
    }
  }

  render() {
    console.log(this)
    if(this.props.order)  {
      return (
        <I18n ns="translations">
          {t => (
            <Modal show={this.state.show} onHide={this.props.onClose}>
                  <div id="faq" className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
                    <i className="material-icons">clear</i>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{`Unique Reference: ${this.props.order.unique_reference}`}</p>
                  <p>{`Status: ${this.props.order.status_name[0][1]}`}</p>
                  <p>{`Withdraw Address: ${this.props.order.withdraw_address.address} 
                  (${this.props.order.withdraw_address.currency_code})`}</p>
                  <p>{`Deposit Address: ${this.props.order.deposit_address.address} 
                  (${this.props.order.deposit_address.currency_code})`}</p>
                  {this.props.order.status_name[0][1] === 'INITIAL' ? 
                  <span>{`In order to complete your order, send ${this.props.order.amount_base} 
                  ${this.props.order.deposit_address.currency_code}
                  to the deposit address`}</span>
                  : null}
                </div>
              </div>
            </Modal>
          )}
        </I18n>);
      } else {
        return null;
      }
  }
}

const mapStateToProps = ({ order }) => ({ order });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositModal);
