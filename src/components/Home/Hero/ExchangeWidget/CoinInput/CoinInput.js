import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import classNames from 'classnames';
import debounce from 'Utils/debounce';
import { fetchPrice } from 'Actions/index.js';
import CoinSelector from './CoinSelector/CoinSelector';
import MinMax from 'Components/MinMax/MinMax';
import styles from './CoinInput.scss';

class CoinInput extends PureComponent {
  state = {
    value: '...',
    fetching: this.props.price.fetching,
    inputClass: undefined,
    changed: false,
  };

  handleFocus = event => {
    if (event.target.value === '...') {
      this.setState({ value: '' });
    }
  };

  handleBlur = event => {
    if (event.target.value === '') {
      this.setState({ value: '...' });
    }
  };

  handleChange = event => {
    let { value } = event.target;
    // remove any whitespaces from amount
    value = value.replace(' ', '');
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.setState({ value, changed: true });
    this.fetchAmounts(value);

    // Add error class to input if less than min or more than max
    const { min_amount_base, max_amount_base, min_amount_quote, max_amount_quote } = this.props.price;
    if (this.props.type === 'deposit') {
      parseFloat(value) < min_amount_quote || parseFloat(value) > max_amount_quote
        ? this.setState({ inputClass: 'error' })
        : this.setState({ inputClass: undefined });
    } else if (this.props.type === 'receive') {
      parseFloat(value) < min_amount_base || parseFloat(value) > max_amount_base
        ? this.setState({ inputClass: 'error' })
        : this.setState({ inputClass: undefined });
    }

    window.gtag('event', 'Change amount', { event_category: 'Order', event_label: `` });
  };

  setValue = value => {
    const simulatedEvent = { target: { value: value.toString() } };
    this.handleChange(simulatedEvent);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  fetchAmounts = debounce(value => {
    const pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
    const data = {
      pair,
      lastEdited: this.props.type,
    };

    data[this.props.type] = value;

    if (value.length) {
      this.props.fetchPrice(data);
    }
  }, 600);

  focus = () => {
    if (this.props.type === 'deposit') {
      this.nameInput.focus();
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.price.lastEdited !== this.props.type && this.state.changed) this.setState({ changed: false });

    if (nextProps.price.fetching && !this.state.changed) {
      this.setState({ value: '...' });
    } else {
      this.setState({ fetching: false });
      const updatedAmount = nextProps.price[this.props.type];
      if (updatedAmount && updatedAmount !== '...' && updatedAmount !== this.state.value) this.setState({ value: updatedAmount });
    }
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 col-sm-5">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label htmlFor={this.props.type} className={styles.label}>
                {t('order.' + this.props.type)}
              </label>
              <input
                type="text"
                className={classNames('form-control', styles.input, this.state.inputClass)}
                id={`coin-input-${this.props.type}`}
                name={this.props.type}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.value}
                ref={input => {
                  this.nameInput = input;
                }}
                disabled={this.state.fetching}
              />
            </form>

            <CoinSelector type={this.props.type} onSelect={this.focus} />
            <MinMax
              home={true}
              min={this.props.type === 'deposit' ? this.props.price.min_amount_quote : this.props.price.min_amount_base}
              max={this.props.type === 'deposit' ? this.props.price.max_amount_quote : this.props.price.max_amount_base}
              amount={this.props.type === 'deposit' ? this.props.price.deposit : this.props.price.receive}
              setValue={this.setValue}
            />
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price }) => ({ selectedCoin, price, lastEdited: selectedCoin.lastSelected });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrice }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinInput);
