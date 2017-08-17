import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-fa';
import { Button, Modal, Overflowing, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Support extends Component {
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
      <Modal id="support-modal" show={this.state.showModal} onHide={this.props.onClose} >
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">Support</h4>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <h3>Email</h3>
                <p><a href="mailto:support@nexchange.co.uk">support@nexchange.co.uk</a></p>
              </div>

              <div className="col-xs-12 col-sm-6">
                <h3>Phone</h3>
                <p>+442081442192<br/>
                  +16464612858 (US)</p>
              </div>
            </div>

            <form id="support-form">
              <div className="form-group is-empty">
                <input type="name" className="form-control" placeholder="Name" required />
                <span className="material-input"></span>
              </div>

              <div className="form-group is-empty">
                <input type="phone" className="form-control" placeholder="Telephone" />
                <span className="material-input"></span>
              </div>

              <div className="form-group is-empty">
                <input type="email" className="form-control" placeholder="Email" required />
                <span className="material-input"></span>
              </div>

              <div className="form-group is-empty">
                <input type="text" className="form-control" placeholder="Subject" />
                <span className="material-input"></span>
              </div>

              <textarea className="form-control" placeholder="Message" rows="2" required></textarea>

              <button type="submit" className="btn btn-success">Send</button>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} >Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Support;
