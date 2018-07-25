import React from 'react';
import { I18n } from 'react-i18next';
import { Modal } from 'react-bootstrap';

const OrderReferralTerms = props => (
  <I18n ns="translations">
    {t => (
      <Modal id="OrderReferralTerms" show={props.show} onHide={props.onClose}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={props.onClose}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">{t('referral.3')}</h4>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-xs-12">
                <p> {t('referral.4')}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )}
  </I18n>
);

export default OrderReferralTerms;
