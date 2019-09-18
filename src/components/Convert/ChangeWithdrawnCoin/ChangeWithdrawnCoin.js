import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import styles from './ChangeWithdrawnCoin.scss';


class ChangeWithdrawnCoin extends Component {

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={`col-xs-12 ${styles.container}`}>
              <span>{`Convert ${this.props.amount} ${this.props.receive} to another Cryptocurrency:`}</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
              <span>LTC</span>
          </div>
        )}
      </I18n>
    );
  }

}

const mapStateToProps = ({ }) => ({  });
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeWithdrawnCoin);