import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setPaymentId } from 'Actions/index.js';
import styles from './WalletAddress.scss';
import { I18n } from 'react-i18next';

class PaymentId extends Component {
  constructor(props) {
    super(props);

    this.state = { paymentId: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const paymentId = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ paymentId });
    this.props.setPaymentId({ paymentId, valid: true })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 active">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref={this.props.inputRef}
                className={`form-control ${styles.input}`}
                id="withdraw-addr"
                onChange={this.handleChange}
                value={this.state.paymentId}
                placeholder={t('generalterms.paymentid')}
              />
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, paymentId }) => ({ selectedCoin, paymentId });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setPaymentId }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentId);
