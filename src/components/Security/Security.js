import React from 'react';
import { I18n } from 'react-i18next';
import './tables.css';

const Security = () => {
  return (
      
    <I18n ns="translations">
      {t => (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>{t('security.1')}</h2>
              <p>{t('security.2')}</p>
              <h3><b>{t('security.3')}</b></h3>
              <p>{t('security.4')}</p>
              <h3><b>{t('security.5')}</b></h3>
              <p>{t('security.6')}</p>
              <p>
                <table>
  <tr>
    <th>{t('security.62')}</th>
    <th>{t('security.63')}</th>
  </tr>
  <tr>
    <td>{t('security.7')}</td>
    <td>{t('security.8')}</td>
  </tr>
  <tr>
    <td>{t('security.9')}</td>
    <td>{t('security.10')}</td>
  </tr>
  <tr>
    <td>{t('security.11')}</td>
    <td>{t('security.12')}</td>
  </tr>
  <tr>
    <td>{t('security.13')}</td>
    <td>{t('security.14')}</td>
  </tr>
  
</table></p>
              <p>{t('security.15')}</p>
              <h3><b>{t('security.16')}</b></h3>
              <ol>
                <li>{t('security.17')}</li>
                <li>{t('security.18')}</li>
                <li>{t('security.19')}</li>
              </ol>
              <h3><b>{t('security.20')}</b></h3>
              <ol>
                <li>{t('security.21')}</li>
                <li>{t('security.22')}</li>
                <li>{t('security.23')}</li>
                <li>{t('security.24')}</li>
                <li>{t('security.25')}</li>
                <li>{t('security.26')}</li>
              </ol>

              <h3><b>{t('security.27')}</b></h3>
              <ul>
                <li>{t('security.28')}</li>
                <li>{t('security.29')}</li>
              </ul>
              <h3><b>{t('security.30')}</b></h3>
              <ul>
                <li>{t('security.32')}</li>
                <li>{t('security.33')}</li>
                <li>{t('security.34')}</li>
                <li>{t('security.35')}</li>
              </ul>
              <h3><b>{t('security.36')}</b></h3>
              <h4><b>{t('security.37')}</b></h4>
              <ul>
                <li>{t('security.38')}</li>
                <li>{t('security.39')}</li>
                <li>{t('security.40')}</li>
                <li>{t('security.41')}</li>
                <li>{t('security.42')}</li>
                <li>{t('security.43')}</li>
                <li>{t('security.44')}</li>
                <li>{t('security.45')}</li>
                <li>{t('security.46')}</li>
                <li>{t('security.47')}</li>
                <li>{t('security.48')}</li>
                <li>{t('security.49')}</li>
                <li>{t('security.50')}</li>
                <li>{t('security.51')}</li>
                <li>{t('security.52')}</li>
                <li>{t('security.53')}</li>
                <li>{t('security.54')}</li>
                <li>{t('security.55')}</li>
                <li>{t('security.56')}</li>
                <li>{t('security.57')}</li>
                <li>{t('security.58')}</li>
              
              </ul>
              <h3><b>{t('security.59')}</b></h3>
              <p>{t('security.60')}</p>
              <p>{t('security.61')}</p>
              <h3><b>{t('security.64')}</b></h3>
              <p>{t('security.65')}</p>
              
              <br />
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default Security;
