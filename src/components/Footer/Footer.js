import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.container}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <p className={styles.address}>
            All rights reserved, YOA LTD 2016-2017,<br />England & Wales{' '}
            <a href="https://beta.companieshouse.gov.uk/company/10009845" rel="noopener noreferrer" target="_blank">
              registered company No. 10009845
            </a>
          </p>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-6">
          <ul className={styles.links}>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            {/*<li><Link to="/refund-cancellation">Refund and Cancellation Policy</Link></li>*/}
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
