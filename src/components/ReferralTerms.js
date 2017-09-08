import React from 'react';
import { Modal } from 'react-bootstrap';


const ReferralTerms = props => (
  <Modal id="ReferralTerms" show={props.show} onHide={props.onClose}>
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={props.onClose}>
          <i className="material-icons">clear</i>
        </button>
        <h4 className="modal-title">Terms & Conditions</h4>
      </div>

      <div className="modal-body">
        <div className="row">
          <div className="col-xs-12">
            <p>1. We pay $5 worth of your receive currency on this order, per each person referred.</p>
            <p>2. We send payments in aggregate each end of day.</p>
            <p>3. You will be receiving your funds to the withdraw address specified on this order.</p>
            <p>4. If you would like to change withdrawal address or preferred currency, let us know in support and we will take care of it.</p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default ReferralTerms;
