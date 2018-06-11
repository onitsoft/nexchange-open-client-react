import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import STATUS_CODES from '../../statusCodes';

class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    let width = '0%';
    const status = this.props.status;

    if (STATUS_CODES[status] === 'COMPLETED') {
      width = '100%';
    } else if (STATUS_CODES[status] === 'RELEASE') {
      width = '90%';
    } else if (STATUS_CODES[status] === 'PRE_RELEASE') {
      width = '75%';
    } else if (STATUS_CODES[status] === 'PAID') {
      width = '66.6%';
    } else if (STATUS_CODES[status] === 'PAID_UNCONFIRMED') {
      width = '33.3%';
    } else if (STATUS_CODES[status] === 'INITIAL') {
      width = '33.3%';
    }

    return (
      <I18n ns="translations">
        {
         (t) => (
      <div className="row">
        <div className="col-xs-12">
          <div id="order-status">
            <div
              id="step-one"
              className={[0, 8].indexOf(status) > -1 ? 'step' : status > 11 ? 'step done' : 'step active'}
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title={t('order.status11')}
            >
              <span className="glyphicon glyphicon-save" aria-hidden="true" />
              <h4>{t('order.status1')}</h4>
            </div>

            <div
              id="step-two"
              className={STATUS_CODES[status] === 'PAID_UNCONFIRMED' ? 'step active' : status >= 13 ? 'step done' : 'step'}
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title={t('order.status21')}
            >
              <span className="glyphicon glyphicon-transfer" aria-hidden="true" />
              <h4>{t('order.status2')}</h4>
            </div>

            <div
              id="step-three"
              className={
                status === 13 || status === 14 ? 'step active' : status >= 15 ? (status === 15 ? 'step active' : 'step done') : 'step'
              }
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title={t('order.status31')}
            >
              <span className="glyphicon glyphicon-ok" aria-hidden="true" />
              <h4>{t('order.status3')}</h4>
            </div>

            <div className="progres-container">
              <div className="progress progress-line-info">
                <div className="progress-bar progress-bar-info" role="progressbar" style={{ width: width }}>
                  <span className="sr-only">{width} {t('order.complete')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          )
        }
      </I18n>
    );
  }
}

export default OrderStatus;
