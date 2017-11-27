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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  onDropID(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles);
    console.log(rejectedFiles);
  }

  onDropResidence(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles);
    console.log(rejectedFiles);
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({show: this.props.show});
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onClose();
  }

  close() {
    this.props.onClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const dropzoneStyle = {
      width: '100%',
      height: '200px',
      borderWidth: '2px',
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: '5px',
      textAlign: 'center',
      paddingTop: '65px',
      margin: '15px 0',
    };

    const dropzoneActiveStyle = {
    };

    const dropzoneAcceptStyle = {
      background: 'rgba(29, 182, 173, 0.2)'
    };

    const dropzoneRejectStyle = {
      background: '#ff572275'
    };

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
            <h2>Government issued ID</h2>
            <small>e.g. color scanned passport, driving license, ID card. Shows date of birth, has expiration date.</small>

            <Dropzone onDrop={this.onDropID.bind(this)}
              accept="image/jpeg, image/png"
              style={dropzoneStyle}
              activeStyle={dropzoneActiveStyle}
              acceptStyle={dropzoneAcceptStyle}
              rejectStyle={dropzoneRejectStyle}
            >
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted.</p>
            </Dropzone>

            <h2>Proof of residence</h2>
            <small>e.g. utility bill no more than 3 months old, bank statement, credit card statement.</small>

            <Dropzone onDrop={this.onDropResidence.bind(this)}
              accept="image/jpeg, image/png"
              style={dropzoneStyle}
              activeStyle={dropzoneActiveStyle}
              acceptStyle={dropzoneAcceptStyle}
              rejectStyle={dropzoneRejectStyle}
            >
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted.</p>
            </Dropzone>
          </div>
        </div>
      </Modal>
    );
  }
}

export default KYCModal;
