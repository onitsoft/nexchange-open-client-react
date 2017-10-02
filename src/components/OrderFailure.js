import React from 'react';
import config from '../config';


const OrderFailure = (props) => (
  <div id="order-failure" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>Order Processing Failed</h2>
      <h5>İşleminizle ilgili bir problem oluştu. Lütfen <a href={`mailto:${config.SUPPORT_EMAIL}`}>{config.SUPPORT_EMAIL} adresinden destek talebinde bulunun.</a></h5>

  </div>
);

export default OrderFailure;
