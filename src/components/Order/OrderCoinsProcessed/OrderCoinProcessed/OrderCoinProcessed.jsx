import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import copy from 'clipboard-copy';
import isFiatOrder from 'Utils/isFiatOrder';
import styles from './OrderCoinProcessed.scss';
import i18n from 'Src/i18n';
import MinMax from 'Components/MinMax/MinMax';

class OrderCoinProcessed extends Component {
  state = { order: this.props.order };

  componentDidMount() {
    this.prepareState(this.props);

    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ order: nextProps.order }, () => {
      this.prepareState(nextProps);
    });
  }

  triggerCopyTooltip = () => {
    if (process.env.NODE_ENV !== 'test') {
      $('#copy-address-to-clipboard').tooltip({
        trigger: 'click',
        placement: 'top',
      });

      $('#copy-address-to-clipboard')
        .tooltip('hide')
        .attr('data-original-title', i18n.t('order.copy'))
        .tooltip('show');

      setTimeout(() => {
        $('#copy-address-to-clipboard').tooltip('destroy');
      }, 1000);

      copy(this.props.order.deposit_address.address);
    }
  };

  prepareState = props => {
    if (props.type === 'Deposit') {
      this.setState({
        coin: props.order.pair.quote.code,
        oppositeCoin: props.order.pair.base.code,
        amount: parseFloat(props.order.amount_quote),
        address: props.order.deposit_address ? props.order.deposit_address.address : '',
        order: props.order,
      });
    } else if (props.type === 'Receive') {
      this.setState({
        coin: props.order.pair.base.code,
        oppositeCoin: props.order.pair.quote.code,
        amount: parseFloat(props.order.amount_base),
        address: props.order.withdraw_address ? props.order.withdraw_address.address : '',
        order: props.order,
      });
    }
  };

  renderRates() {
    let rates = ``;

    if (this.state.order && this.state.order.price) {
      rates += `${i18n.t('order.rates')}: \n`;
      rates += `1 ${this.state.coin} = `;

      if (this.props.type === 'Deposit') rates += `${(1 / this.state.order.price.rate).toFixed(6)} ${this.state.oppositeCoin}\n`;
      else if (this.props.type === 'Receive') rates += `${this.state.order.price.rate.toFixed(6)} ${this.state.oppositeCoin}\n`;

      rates += `1 ${this.state.coin} = `;

      if (this.props.type === 'Deposit')
        rates += `${((1 / this.state.order.price.rate) * this.state.order.price.rate_usd).toFixed(6)} USD\n`;
      else if (this.props.type === 'Receive') rates += `${this.state.order.price.rate_usd.toFixed(6)} USD\n`;

      rates += `1 ${this.state.coin} = `;

      if (this.props.type === 'Deposit') rates += `${((1 / this.state.order.price.rate) * this.state.order.price.rate_btc).toFixed(6)} BTC`;
      else if (this.props.type === 'Receive') rates += `${this.state.order.price.rate_btc.toFixed(6)} BTC`;

      if (this.state.order.user_provided_amount === 1 && this.props.type === 'Receive') {
        rates += `\n\n${i18n.t('order.fee')}: \n`;
        rates += `${this.state.order.withdrawal_fee} ${this.state.order.pair.base.code}`;
      } else if (this.state.order.user_provided_amount === 0 && this.props.type === 'Deposit') {
        rates += `\n\n${i18n.t('order.fee')}: \n`;
        rates += `${this.state.order.withdrawal_fee_quote} ${this.state.order.pair.quote.code}`;
      }
    }

    return rates;
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12 col-sm-6 ${styles['col-sm-6']} ${this.props.type === 'Receive' ? styles['pull-right-md'] : ''}`}>
            <div
              className={`${styles.box} box ${this.props.type === 'Deposit' && isFiatOrder(this.props.order) ? 'fiat' : ''} ${
                !isFiatOrder(this.props.order) || this.props.type === 'Receive' ? styles['crypto'] : ''
              }`}
            >
              <div className={`${styles['media-left']}`}>
                <i className={`${styles.coin} cc ${this.state.coin}`} />
              </div>

              <div className={`${styles['media-right']}`}>
                <h5>
                  {t('order.' + this.props.type)}{' '}
                  <b>
                    {this.state.amount} {this.state.coin}
                  </b>
                  <i
                    className="fa fa-question-circle"
                    data-toggle="tooltip"
                    data-placement="top"
                    style={{ marginLeft: 8 }}
                    data-original-title={this.renderRates()}
                  />
                </h5>

                <div>
                  <div className={styles.address}>
                    <h6>{this.state.address}</h6>
                  </div>

                  {this.props.type === 'Deposit' &&
                    !isFiatOrder(this.props.order) && (
                      <i
                        id="copy-address-to-clipboard"
                        className={`${styles.copy} fas fa-copy`}
                        data-test="copy-address"
                        onClick={() => this.triggerCopyTooltip()}
                      />
                    )}
                </div>

                <MinMax {...this.props} />
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderCoinProcessed;
