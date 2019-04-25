import React from 'react';
import OrderModeSwitch from '../OrderModeSwitch/OrderModeSwitch';
import styles from './OrderBookDisabled.scss';

const OrderBookDisabled = props => {
    return   (<div className={styles.container}>
                <div className='container'>
                 <div className='row'>
                    <div className='col-xs-12'>
                        <div className={styles.widget}>
                        <OrderModeSwitch orderMode={props.orderMode} changeOrderMode={props.changeOrderMode}/>
                        <h1>Advanced Mode is currently disabled</h1>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>)
};

export default OrderBookDisabled;
