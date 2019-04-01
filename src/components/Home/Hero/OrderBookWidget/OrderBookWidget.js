import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';
import i18n from 'Src/i18n';
import axios from 'axios';
import config from 'Config';

import { setWallet, errorAlert, setOrder } from 'Actions/index.js';
import { bindCrispEmail } from 'Utils/crispEmailBinding';


import styles from './OrderBookWidget.scss';

class OrderBookWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      loading: false,
    };

    this.placeOrder = this.placeOrder.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidMount() {

  }

  placeOrder() {
  }


  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">

            </div>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, price, error, wallet }) => ({ selectedCoin, price, error, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ setWallet, setOrder, errorAlert }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBookWidget);
