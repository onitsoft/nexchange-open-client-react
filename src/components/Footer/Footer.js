import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.container}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <p className={styles.address}>
            All rights reserved, DRAGONDEX {new Date().getFullYear()}
            <br />
            Australia
          </p>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-6">
          <ul className={styles.links}>
            <li>
              <Link to="/terms-and-conditions">TERMS AND CONDITIONS</Link>
            </li>
            <li>
              <Link to="/privacy">PRIVACY POLICY</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
