import React from 'react';
import { I18n } from 'react-i18next';
import isFiatOrder from 'Utils/isFiatOrder';
import styles from './MinMax.scss';

const MinMax = props => {
  if (props.order && isFiatOrder(props.order) && props.type === 'Deposit') return null;

  let clickable = false;
  if(props.setValue){
    clickable = true;
  }

  return (
    <I18n ns="translations">
      {t => (
        <div className={`${styles.minmax} ${props.home ? styles.home : ''}`}>
          <p className={`${props.min > props.amount && props.amount !== '...' ? 'error' : ''}`}>
            {`${t('exchangewidget.min')}: `} 
            <span className={`bold ${clickable ? 'clickable' : ''}`} onClick={() => {props.setValue(props.min);}}>
              {props.min}
            </span>
          </p>

          <p className={`${props.max < props.amount && props.amount !== '...' ? 'error' : ''}`}>
            {`${t('exchangewidget.max')}: `} 
            <span className={`bold ${clickable ? 'clickable' : ''}`} onClick={() => {props.setValue(props.max);}}>
              {props.max}
            </span>          
          </p>
        </div>
      )}
    </I18n>
  );
};

export default MinMax;
