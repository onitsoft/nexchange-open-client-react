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

  handleChange(event) {
    let address = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    const valid = validateWalletAddress(
      address,
      this.props.selectedCoin.receive,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${address} is not a valid ${this.props.selectedCoin.receive} address.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.setState({ address });

    this.props.setWallet({
      address: address,
      valid: valid,
      show: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillMount() {
    this.props.setWallet({ address: '', valid: false, show: false });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.wallet.address !== null && nextProps.wallet.address !== this.state.address) {
      this.setState({ address: nextProps.wallet.address });
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
