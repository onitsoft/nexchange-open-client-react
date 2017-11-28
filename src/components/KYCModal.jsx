import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Dropzone from 'react-dropzone'

import config from '../config';


class KYCModal extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
      filesReady: false,
      governmentID: '',
      residenceProof: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({show: this.props.show});
    }
  }

  close() {
    this.props.onClose();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    }, () => {
      if (this.state.residenceProof.length && this.state.governmentID.length) {
        this.setState({filesReady: true});
      }
    });
  }

  render() {
    return (
      <Modal id="kyc-modal" show={this.state.show} onHide={this.close}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.close}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">Get verified</h4>
          </div>

          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <h2>Government issued ID</h2>
              <small>e.g. color scanned passport, driving license, ID card. Shows date of birth, has expiration date.</small>

              <input type="file" name="governmentID" onChange={this.handleInputChange} accept="image/*" />

              <h2>Proof of residence</h2>
              <small>e.g. utility bill no more than 3 months old, bank statement, credit card statement.</small>

              <input type="file" name="residenceProof" onChange={this.handleInputChange} accept="image/*" />

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.filesReady ? null : "disabled"}>
                <i className="fa fa-file" aria-hidden="true" style={{position: "relative", left: -8, top: 0, fontSize: "14px"}}></i>
                Upload files
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default KYCModal;
