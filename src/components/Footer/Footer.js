import React from 'react';
import { I18n, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
  <I18n ns="translations">
	  {(t) => (

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-6">
		  <Trans i18nKey="footer.3">
          <p className={styles.address}>
            All rights reserved, YOA LTD 2016-2017,<br />England & Wales{' '}
            <a href="https://beta.companieshouse.gov.uk/company/10009845" rel="noopener noreferrer" target="_blank">
              registered company No. 10009845
            </a>
          </p>
	   	  </Trans>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-6">
          <ul className={styles.links}>
            <li>
              <Link to="/terms-and-conditions">{t('footer.1')}</Link>
            </li>
            <li>
              <Link to="/privacy">{t('footer.2')}</Link>
            </li>
            {/*<li><Link to="/refund-cancellation">{t('footer.6')}</Link></li>*/}
          </ul>
        </div>
      </div>
    </div>
	)}
	</I18n>
  </footer>
);

export default Footer;
