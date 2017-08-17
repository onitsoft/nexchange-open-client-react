import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-fa';
import { Button, Modal, Overflowing, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super();

    this.state = {
      showModal: false
    }
  }

  componentDidUpdate() {
    if (this.state.showModal != this.props.showModal) {
      this.setState({
        showModal: this.props.showModal
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.props.onClose} >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">FAQ</h4>
          </div>

          <div className="modal-body">
            <h3>Who are you?</h3>
            <p>Nexchange is an automated cryptocurrency exchange service, operated by YOA LTD. (registered in United Kingdom).</p>
            <p>Our customer support phone number is +442081442192.</p>

            <h3>What is your fee?</h3>
            <p>Our service fee is 0.5%. No hidden fees here, the amount you see on the screen is the exact amount you will be getting in your wallet.</p>

            <h3>What do you do?</h3>
            <p>We allow you to exchange one cryptocurrency for another.</p>
            <p>Right now we support Bitcoin (BTC), Ethereum (ETC) and Litecoin (LTC).</p>
            <p>We will be adding more currencies in the near future, stay tuned!</p>
            <p>Missing your favorite coin? Let us know here: <a href="mailto:support@nexchange.co.uk">support@nexchange.co.uk</a>.</p>

            <h3>How long does it take to convert?</h3>
            <p>Initiation a transaction doesn’t take more than a couple of minutes. Actual processing takes about 5-10 minutes before you receive your coins.</p>

            <h3>Do you collect any private information?</h3>
            <p>We do not collect or store any private information about you. The process is completely anonymous.</p>

            <h3>Are you using a third-party exchange or API?</h3>
            <p>No, our solution is completely independant. We use our internal coin reserves to provide liquidity.</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} >Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Header;





<Button >Close</Button>

