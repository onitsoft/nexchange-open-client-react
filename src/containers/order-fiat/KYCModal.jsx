import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import config from '../../config';


class KYCModal extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
      filesReady: false,
      governmentID: '',
      residenceProof: '',
      title: 'Get verified',
      button: 'Upload file(s)',
      titleClass: ''
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

    this.setState({title: 'Uploading...', titleClass: 'warning', button: 'Uploading...', filesReady: false});

    let formData = new FormData();

    let governmentID = document.querySelector('#governmentID');
    if (governmentID)
      formData.append('identity_document', governmentID.files[0]);

    let residenceProof = document.querySelector('#residenceProof');
    if (residenceProof)
      formData.append('utility_document', residenceProof.files[0]);

    formData.append('order_reference', this.props.match.params.orderRef)
    axios.post(`${config.API_BASE_URL}/kyc/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
      this.setState({title: 'Verification documents uploaded!', titleClass: 'green', button: 'Uploaded', filesReady: false});

      setTimeout(() => {
        this.props.onClose();
      }, config.KYC_DETAILS_FETCH_INTERVAL / 2);
    })
    .catch(error => {
      console.log(error);

      this.setState({title: 'Something went wrong, please try resubmitting', titleClass: 'danger', button: 'Upload file(s)'});
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    }, () => {
      let needUploadResidence = (document.querySelector('#residenceProof') ? true : false),
        needUploadID = (document.querySelector('#governmentID') ? true : false);

      if (needUploadResidence && needUploadID && this.state.residenceProof.length && this.state.governmentID.length)
        this.setState({filesReady: true});
      else if (needUploadResidence && needUploadID && (!this.state.residenceProof.length || !this.state.governmentID.legth))
        this.setState({filesReady: false});
      else if (needUploadResidence && this.state.residenceProof.length)
        this.setState({filesReady: true});
      else if (needUploadID && this.state.governmentID.length)
        this.setState({filesReady: true});
      else
        this.setState({filesReady: false});
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
            <h4 className={`modal-title text-${this.state.titleClass}`}>{this.state.title}</h4>
          </div>

          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              {this.props.kyc.id_document_status !== 'APPROVED' ? 
                <div>
                  <h2>Government issued ID</h2>
                  <small>e.g. color scanned passport, driving license, ID card. Shows date of birth, has expiration date.</small>
                  <input type="file" name="governmentID" id="governmentID" onChange={this.handleInputChange} accept="image/*" />
                </div> : null}

              {this.props.kyc.residence_document_status !== 'APPROVED' ?
                <div>
                  <h2>Proof of residence</h2>
                  <small>e.g. utility bill no more than 3 months old, bank statement, credit card statement.</small>
                  <input type="file" name="residenceProof" id="residenceProof" onChange={this.handleInputChange} accept="image/*" />
                </div> : null}

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.filesReady ? null : "disabled"}>
                <i className="fa fa-file" aria-hidden="true" style={{position: "relative", left: -8, top: 0, fontSize: "14px"}}></i>
                {this.state.button}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default KYCModal;
