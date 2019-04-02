import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';


class OrderDepth extends PureComponent {
  state = {
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={``}>
          <h5 className={``}>{`ORDER DEPTH - ${this.props.side}`}</h5>
          <div className={``}>
            <span className={``}>Market Size</span>
            <span className={``}>Price</span>
          </div>
          <div className={``}>
          </div>
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
)(OrderDepth);
