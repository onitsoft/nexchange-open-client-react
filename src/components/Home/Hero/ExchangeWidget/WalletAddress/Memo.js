import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setMemo } from 'Actions/index.js';
//import validateWalletAddress from 'Utils/validateWalletAddress';
import styles from './WalletAddress.scss';
import { I18n } from 'react-i18next';
import i18n from '../../../../../i18n';

class Memo extends Component {
  constructor(props) {
    super(props);

    this.state = { memo: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = (memo, receiveCoin) => {
    if (memo === '' || !receiveCoin) {
      this.props.setMemo({
        memo,
        valid: false,
      });

      return this.props.errorAlert({ show: false });
    }

    const valid = validateWalletAddress(
      memo,
      receiveCoin,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${memo} ${i18n.t('error.novalid')} ${this.props.selectedCoin.receive} ${i18n.t('generalterms.memo')}.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.props.setMemo({
      memo,
      valid,
    });
  };

  handleChange(event) {
    const memo = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ memo });
    this.validate(memo, this.props.selectedCoin.receive);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoin.receive !== this.props.selectedCoin.receive) {
      this.validate(this.state.memo, nextProps.selectedCoin.receive);
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
                value={this.state.memo}
                placeholder={t('generalterms.memo', { selectedCoin: coin })}
              />
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, memo }) => ({ selectedCoin, memo });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setMemo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Memo);
