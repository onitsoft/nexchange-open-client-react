import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-i18next';


class LimitOrderForm extends PureComponent {
  state = {
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={``}>
       
          <button>BUY</button>
          <button>SELL</button>
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
)(LimitOrderForm);
