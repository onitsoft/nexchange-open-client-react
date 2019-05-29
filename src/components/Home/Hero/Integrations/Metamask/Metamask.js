import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open } from '@colony/purser-metamask'
import { setWallet } from 'Actions/index.js';

import styles from '../Integrations.scss';

class Metamask extends Component {
  onClick = async () => {
    const address = "casdf";
    const wallet = await open();
    if(wallet && wallet.address) {
        this.props.setWallet({
        address: wallet.address,
        valid: true,
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

const mapStateToProps = ({}) => ({ });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metamask);
