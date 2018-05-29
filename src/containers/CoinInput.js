import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'throttle-debounce';
import { fetchPrice } from '../actions/index.js';
import CoinSelector from './CoinSelector';

class CoinInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: '...',
    };

    this.fetchAmounts = debounce(450, this.fetchAmounts);
  }

  onChange = event => {
    const re = /^[0-9.,\b]+$/;
    if (!re.test(event.target.value) && event.target.value !== '') return;

    this.setState({ value: event.target.value });
    this.fetchAmounts(event.target.value);

    ga('send', 'event', 'Order', 'change amount');
  };

  onFocus = event => {
    if (event.target.value === '...') {
      this.setState({ value: '' });
    }
  };

  onBlur = event => {
    if (event.target.value === '') {
      this.setState({ value: '...' });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  fetchAmounts = value => {
    let pair = `${this.props.selectedCoin.receive}${this.props.selectedCoin.deposit}`;
    let data = {
      pair: pair,
      lastEdited: this.props.type,
    };

    data[this.props.type] = value;
    this.props.fetchPrice(data);
  };

  focus = () => {
    this.nameInput.focus();
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.type === 'receive') {
      this.setState({ value: nextProps.price.receive });
    } else if (nextProps.type === 'deposit') {
      this.setState({ value: nextProps.price.deposit });
    }
  };

  render() {
    return (
      <div className="col-xs-12 col-sm-6">
        <form className="form-group label-floating" onSubmit={this.handleSubmit}>
          <label htmlFor={this.props.type} className="control-label text-green">
            {this.props.type}
          </label>
          <input
            type="text"
            className="form-control coin amount-input"
            id={`coin-input-${this.props.type}`}
            name={this.props.type}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
            ref={input => {
              this.nameInput = input;
            }}
          />

          <CoinSelector type={this.props.type} onSelect={this.focus} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price }) => ({ selectedCoin, price });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrice }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinInput);
