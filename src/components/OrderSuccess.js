import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const OrderSuccess = (props) => (
  <div id="order-success" className="col-xs-12 text-center">
      <h2 style={{margin: "0"}}>İşleminiz Tamamlandı!</h2>
      <h5><Link to="/" className="text-green">Yeni bir işlem başlatın.</Link></h5>

      <a href={`${config.API_BASE_URL}/orders/${props.orderRef}`} target="_blank"><h4 style={{margin: "25px 0 18px", "fontWeight": "500"}}>İşlem detaylarınızı inceleyebilirsiniz</h4></a>
  </div>
);

export default OrderSuccess;
