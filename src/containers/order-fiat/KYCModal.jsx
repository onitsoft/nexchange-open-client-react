import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import setUserEmail from '../../helpers/setUserEmail';
import fetchUserEmail from '../../helpers/fetchUserEmail';

class KYCModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      filesReady: false,
      governmentID: '',
      residenceProof: '',
      title: 'Get verified',
      buttonText: 'Upload file(s)',
      titleClass: '',
      email: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
		fetchUserEmail(email => {
			this.setState({ email })
		});
  }

  componentDidUpdate() {
    if (this.state.show !== this.props.show) {
      this.setState({show: this.props.show}, () => {
        $(function() {
          $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
        });
      });
    }
  }

  close() {
    this.props.onClose();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({title: 'Uploading...', titleClass: 'warning', buttonText: 'Uploading...', filesReady: false});

    const formData = new FormData();
    const governmentID = document.querySelector('#governmentID');
    const residenceProof = document.querySelector('#residenceProof');
    
    formData.append('order_reference', this.props.order.unique_reference);

    if (governmentID) {
      formData.append('identity_document', governmentID.files[0]);
    }
    
    if (residenceProof) {
      formData.append('utility_document', residenceProof.files[0]);
    }

    axios
      .post(`${config.API_BASE_URL}/kyc/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
        this.setState({title: 'Verification documents uploaded!', titleClass: 'green', buttonText: 'Uploaded', filesReady: false});

        setTimeout(() => {
          this.props.onClose();
        }, 3000);
      })
      .catch(error => {
        this.setState({title: 'Something went wrong, please try resubmitting', titleClass: 'danger', buttonText: 'Upload file(s)'});
      });

    if (this.state.email) {
      setUserEmail(this.state.email);
    }
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
            <h5 style={{marginBottom: 0}}>
							<b>This is a one-time process, once verified you’ll be able to complete future purchases instantly.</b>
						</h5>
          </div>

          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              {this.props.kyc.id_document_status !== 'APPROVED' && 
                <div>
                  <h2>Government issued ID</h2>
                  <small>e.g. color scanned passport, driving license, ID card. Shows date of birth, has expiration date.</small>
                  <input type="file" name="governmentID" id="governmentID" onChange={this.handleInputChange} accept="image/*" />
                </div>}

              {this.props.kyc.residence_document_status !== 'APPROVED' &&
                <div>
                  <h2>Proof of residence</h2>
                  <small>A high-resolution photo\scan of a  <b>physical</b> (non-digital: no screenshots, web pages or PDFs generated on the internet) utility bill from a known service provider, not older than 3 months old.
                    Delivery address must be a <b>fiscal, residence address (no PO boxes!).</b></small>
                  <small>Letters from the bank or credit card company  delivered to a <b>fiscal address (not a P.O. BOX)</b> are also accepted.</small>
                  <input type="file" name="residenceProof" id="residenceProof" onChange={this.handleInputChange} accept="image/*" />
                </div>}

              <div className="form-group">
                <input
                  type="email"
                  name="email" 
                  placeholder="Email (optional)"
                  className="form-control"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />

								<i className="fa fa-question-circle"
									data-toggle="tooltip"
									data-placement="left"
									style={{
                    position: "absolute",
                    top: 12,
                    right: 7,
                    zIndex: 99999999
                  }}
                  data-original-title={`Help us reach you in case we need any further information from you.\n
This will also allow us to send you updates about your orders, your referrals, and occasional info about our product.`}>
								</i>
              </div>

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.filesReady ? null : "disabled"}>
                <i className="fa fa-file" aria-hidden="true" style={{position: "relative", left: -8, top: 0, fontSize: "14px"}}></i>
                {this.state.buttonText}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default KYCModal;
