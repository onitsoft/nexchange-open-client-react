import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const OrderSuccess = (props) => (
  <div id="order-success" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>İşleminiz Tamamlandı!</h2>
      <h5><Link to="/" className="text-green">Yeni bir işlem başlatın.</Link></h5>

  </div>
);

export default OrderSuccess;
