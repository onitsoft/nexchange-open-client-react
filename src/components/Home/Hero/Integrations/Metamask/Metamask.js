import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open } from '@colony/purser-metamask'
import { setWallet, errorAlert, selectCoin, fetchPrice } from 'Actions/index.js';
import i18n from 'Src/i18n';

import styles from '../Integrations.scss';

class Metamask extends Component {
  onClick = async () => {
    try {
        const wallet = await open();
        if(wallet && wallet.address) {
            this.props.setWallet({
            address: wallet.address,
            valid: true,
            });

            const depositCoin = this.props.selectedCoin.deposit;
            const receiveCoin = 'ETH';

            this.props.selectCoin({
              ...this.props.selectedCoin,
              receive: receiveCoin,
              orderByAddress: true,
            }, this.props.pairs);
      
            const pair = `${receiveCoin}${depositCoin}`;
            const data = {
              pair,
              lastEdited: 'receive',
            };
      
            data['deposit'] = receiveCoin;
            data['receive'] = depositCoin;
            this.props.fetchPrice(data);
        }
    } catch (error) {
        console.log(error); 
        this.props.errorAlert({
            show: true,
            message: i18n.t('integrations.error.metamask'),
        });
    }
  };  

  render() {
    return (
      <div className={styles.button} onClick={() => this.onClick()}>
          <img src="/img/metamask-logo.svg" alt="metamask logo"></img>
         Metamask
      </div>
    );
  }
}

const mapStateToProps = ({ selectedCoin, pairs }) => ({ selectedCoin, pairs });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, errorAlert, selectCoin, fetchPrice }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Metamask);
