import React from 'react';
import { I18n } from 'react-i18next';
import visa from './images/visa.png';
import mastercard from './images/mastercard.png';
import styles from './BuyWithCreditCard.scss';

const BuyWithCreditCard = props => {
  return (
    <I18n ns="translations">
      {t => (
        <div className={`col-xs-12 ${props.className}`}>
          <div className={styles.container}>
            <h3>{t('hero.3')}</h3>

            <div className={styles.cards}>
              <img src={visa} alt="Visa" />
              <img src={mastercard} alt="Mastercard" />
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default BuyWithCreditCard;
