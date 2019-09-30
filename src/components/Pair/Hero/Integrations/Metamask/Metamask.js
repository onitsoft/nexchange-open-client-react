import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open } from '@colony/purser-metamask'
import { setWallet, errorAlert } from 'Actions/index.js';
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
        }
    } catch (error) {
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

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, errorAlert }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Metamask);
