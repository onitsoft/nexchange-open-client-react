import React, { useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';

import OrderLoading from './OrderLoading/OrderLoading';
import OrderFailed from './OrderMain/OrderState/OrderFailure/OrderFailure';
import BotValidationProvider, { BotValidationContext } from './BotValidation/BotValidationProvider';

import styles from './Order.scss';

const OrderDataProvider = ({ children, isFiat, ...props }) => {
  const botValidationContext = useContext(BotValidationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    props.fetchCoinDetails();
    if (!isFiat && !props.order) {
      props.fetchOrder(props.match.params.orderRef);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Fetching URL only after success bot validations
    if (isFiat) {
      setIsLoading(true);
      props.fetchOrder(props.match.params.orderRef);
      setIsLoading(false);
    }
  }, [botValidationContext.hookTriggerOnSuccess]);

  if (isLoading || !props.order) {
    return (
      <div className={`${styles.container} ${isFiat ? 'order-fiat' : 'order-crypto'}`}>
        <OrderLoading />
      </div>
    );
  }

  if (isFiat && botValidationContext.isVerifiedHuman) {
    return children;
  } else if (!isFiat) {
    return children;
  }

  return (
    <div className={`${styles.container} ${isFiat ? 'order-fiat' : 'order-crypto'}`}>
      <OrderFailed title="error.notfound1" />
    </div>
  );
};

const withOrderDataProvider = OrderComponent => props => {
  const isFiat = useMemo(() => props.order?.isFiat, [props.order?.isFiat]);

  const Order = () => (
    <OrderDataProvider {...props} isFiat={isFiat}>
      <OrderComponent {...props} />
    </OrderDataProvider>
  );

  return isFiat ? (
    <BotValidationProvider>
      <Order />
    </BotValidationProvider>
  ) : (
    <Order />
  );
};

export default withOrderDataProvider;
