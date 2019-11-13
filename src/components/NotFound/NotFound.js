import React, {Component} from 'react';
import { I18n } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import styles from  './NotFound.scss';

export class NotFound extends Component {

  componentDidMount() {
    $("#root").css({'padding-bottom': "0px"});
  }

  componentWillUnmount() {
    $("#root").css({'padding-bottom': "114px"});
  }

  render() {
   return (<I18n ns="translations">
    {t => (
      <div id="not-found" className={styles.container}>
        <div className="col-xs-12 col-sm-12 col-md-5 col-md-offset-1 col-lg-5 col-lg-offset-1">
          <h2>{t('error.notfound1')}</h2>
          <h5>{t('error.notfound21')} <strong>{t('error.notfound22')}</strong> {t('error.notfound23')}</h5>
          <a onClick={this.props.history.goBack}><i className="fas fa-long-arrow-alt-left"></i>{t('error.notfound22')}</a>
        </div>
      </div>
    )}
    </I18n>);
  }  
}

export default withRouter(NotFound);
