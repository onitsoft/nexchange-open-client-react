import React, { Component } from 'react';
import STATUS_CODES from '../../statusCodes';


class OrderStatus extends Component {
  componentDidMount() {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render() {
    let width = "0%";
    const status = this.props.status;

    if (STATUS_CODES[status] == 'COMPLETED') {
      width = "100%";
    } else if (STATUS_CODES[status] == 'RELEASE') {
      width = "90%";
    } else if (STATUS_CODES[status] == 'PRE_RELEASE') {
      width = "75%";
    } else if (STATUS_CODES[status] == 'PAID') {
      width = "66.6%";
    } else if (STATUS_CODES[status] == 'PAID_UNCONFIRMED') {
      width = "33.3%";
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <div id="order-status">
            <hr/>
            
            <div id="step-one" className={[0,8].indexOf(status) > -1 ? "step" : (status > 11 ? "step done" : "step active")} data-toggle="tooltip" data-placement="top" title="" data-original-title="In this step we are waiting for your deposit.">
              <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
              <h4>1. Awaiting deposit</h4>
            </div>

            <div id="step-two" className={STATUS_CODES[status] == 'PAID_UNCONFIRMED' ? "step active" : (status >= 13 ? "step done" : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="Your order is on the blockchain, we are now waiting for the required number of confirmations before you can receive your funds.">
              <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
              <h4>2. Awaiting confirmations</h4> 
            </div>
            
            <div id="step-three" className={status == 13 || status == 14 ? "step active" : (status >= 15 ? (status == 15 ? "step active" : "step done" ) : "step")} data-toggle="tooltip" data-placement="top" title="" data-original-title="We got the funds and now have transferred our funds to you.">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              <h4>3. All done</h4>
            </div>

            <div className="progres-container">
              <div className="progress progress-line-info">
                <div className="progress-bar progress-bar-info" role="progressbar" style={{"width": width}}>
                  <span className="sr-only">{width} Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderStatus;
