import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPrice } from 'Actions/index.js';
import debounce from 'Utils/debounce';
import CoinSelector from './CoinSelector/CoinSelector';
import styles from './CoinInput.scss';

class CoinInput extends PureComponent {
  handleFocus = event => {
    if (event.target.value === '...') {
      this.props.onChange('');
    }
  };

  handleBlur = event => {
    if (event.target.value === '') {
      this.props.onChange('...');
    }
  };

  handleChange = event => {
    let { value } = event.target;
    const re = /^[0-9.,\b]+$/;
    if (!re.test(value) && value !== '') return;

    value = value.replace(/,/g, '.');
    this.props.onChange(value);

    this.fetchAmounts(value);

    ga('send', 'event', 'Order', 'change amount');
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
    this.nameInput.focus();
  };

  render() {
    return (
      <div className="col-xs-12 col-sm-6">
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor={this.props.type} className={styles.label}>
            {this.props.type}
          </label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id={`coin-input-${this.props.type}`}
            name={this.props.type}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.props.value}
            ref={input => {
              this.nameInput = input;
            }}
          />
        </form>

        <CoinSelector type={this.props.type} onSelect={this.focus} />
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price }) => ({ selectedCoin, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinInput);
