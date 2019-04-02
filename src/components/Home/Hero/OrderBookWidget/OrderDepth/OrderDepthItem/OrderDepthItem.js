import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';

import styles from './OrderDepthItem.scss';

class OrderDepthItem extends PureComponent {
  render() {
      const item = this.props.item;
      console.log(item);
      
      return (
      <I18n ns="translations">
        {t => (
          <div className={`${styles.container}`}>
            <span className={``}>{item.size.toFixed(9)}</span>
            <span className={``}>{item.rate.toFixed(3)}</span>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDepthItem);
