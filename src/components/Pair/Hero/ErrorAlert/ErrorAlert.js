import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import Sticky from 'react-stickynode';
import styles from './ErrorAlert.scss';

const ErrorAlert = props => {
  return (
	<I18n ns="translations">
	{(t) => (
    <Sticky enabled={true} top={0} bottomBoundary={1200}>
      <div 
        id="error-alert" 
        className={props.error.show ? `${styles.alert} alert alert-warning` : `${styles.alert} alert alert-warning hidden`}>
        <div className="container">
          <div className="alert-icon">
            <i className="material-icons">error_outline</i>
          </div>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">
              <i className="material-icons">clear</i>
            </span>
          </button>
          <b>{t('error.warning')}:</b> {props.error.message}
        </div>
      </div>
    </Sticky>
	)}
	</I18n>
  );
};

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}

export default connect(mapStateToProps)(ErrorAlert);
