import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setWallet } from 'Actions/index.js';
import validateWalletAddress from 'Utils/validateWalletAddress';
import styles from './WalletAddress.scss';
import { I18n } from 'react-i18next';
import i18n from '../../../../../i18n';

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
          message: `${address} ${i18n.t('error.novalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.address')}.`,
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
    let coin = this.props.selectedCoin.receive ? this.props.selectedCoin.receive : '...';
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
                value={this.state.address}
                placeholder={t('generalterms.youraddress', { selectedCoin: coin })}
              />
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, wallet }) => ({ selectedCoin, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setWallet }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletAddress);
