import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setWallet } from 'Actions/index.js';
import validateWalletAddress from 'Utils/validateWalletAddress';
import styles from './WalletAddress.scss';

class WalletAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { address: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = (address, receiveCoin) => {
    if (address === '' || !receiveCoin) {
      this.props.setWallet({
        address,
        valid: false,
      });

      return this.props.errorAlert({ show: false });
    }

    const valid = validateWalletAddress(
      address,
      receiveCoin,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${address} is not a valid ${receiveCoin} address.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.props.setWallet({
      address,
      valid,
    });
  };

  handleChange(event) {
    const address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ address });
    this.validate(address, this.props.selectedCoin.receive);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoin.receive !== this.props.selectedCoin.receive) {
      this.validate(this.state.address, nextProps.selectedCoin.receive);
    }
  }

  render() {
    return (
      <div className="col-xs-12 active">
        <form className="form-group" onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref={this.props.inputRef}
            className={`form-control ${styles.input}`}
            id="withdraw-addr"
            onChange={this.handleChange}
            value={this.state.address}
            placeholder={`Enter your ${this.props.selectedCoin.receive ? this.props.selectedCoin.receive : '...'} wallet address`}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, wallet }) => ({ selectedCoin, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setWallet }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddress);
