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
            <p> Please contact support to hear more about our affiliate program.</p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default ReferralTerms;
