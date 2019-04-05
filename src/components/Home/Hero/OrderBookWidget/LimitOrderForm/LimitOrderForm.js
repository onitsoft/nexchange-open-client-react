import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';

import styles from './LimitOrderForm.scss';


class LimitOrderForm extends PureComponent {
  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12`}>
            <form>
            <input
                type="text"
                className={`form-control ${styles.input}`}
                id="amount-base"
                value={this.props.amount_base}
                onChange={event => this.props.handleQuantityChange(event)}
                autoComplete="off"
                placeholder={`Quantity (${this.props.selectedCoin.deposit})`}              
              />
              <input
                type="text"
                className={`form-control ${styles.input}`}
                id="limit-rate"
                value={this.props.limit_rate}
                onChange={event => this.props.handleLimitRateChange(event)}
                autoComplete="off"
                placeholder={`Limit Rate (${this.props.selectedCoin.receive})`}              
              />
            </form>    
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin }) => ({ selectedCoin });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LimitOrderForm);
