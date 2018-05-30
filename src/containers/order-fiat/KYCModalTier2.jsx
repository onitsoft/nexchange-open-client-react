import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

class KYCModalTier2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      filesReady: false,
      whitelist_selfie: '',
      residenceProof: '',
      title: 'Get verified',
      buttonText: 'Upload file(s)',
      titleClass: '',
      message: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    if (this.state.show !== this.props.show) {
      this.setState({ show: this.props.show }, () => {
        $(function() {
          $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
        });
      });
    }
  }

  close() {
    this.props.onClose();

    this.setState({
      filesReady: false,
      whitelist_selfie: '',
      title: 'Get verified',
      buttonText: 'Upload file(s)',
      titleClass: '',
      message: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      title: 'Uploading...',
      titleClass: 'warning',
      buttonText: 'Uploading...',
      filesReady: false,
    });

    const formData = new FormData();
    const whitelist_selfie = document.querySelector('#whitelist_selfie');

    formData.append('order_reference', this.props.order.unique_reference);
    formData.append('user_provided_comment', this.state.message.slice(0, 255));

    if (whitelist_selfie) {
      formData.append('whitelist_selfie', whitelist_selfie.files[0]);
    }

    axios
      .post(`${config.API_BASE_URL}/kyc/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        this.setState({
          title: 'Verification documents uploaded!',
          titleClass: 'green',
          buttonText: 'Uploaded',
          filesReady: false,
        });

        setTimeout(() => {
          this.props.onClose();
        }, 2000);
      })
      .catch(error => {
        this.setState({
          title: 'Something went wrong, please try resubmitting',
          titleClass: 'danger',
          buttonText: 'Upload file(s)',
        });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        if (!this.state.whitelist_selfie.length) {
          this.setState({ filesReady: false });
          return;
        }

        this.setState({ filesReady: true });
      }
    );
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
            <h5 style={{ marginBottom: 0 }}>
              <b>
                This is a one-time process, once verified you’ll be able to complete future purchases instantly until current verification
                tier limits are reached.
              </b>
            </h5>
          </div>

          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <div style={{ marginBottom: 45 }}>
                <h2>Whitelist selfie</h2>
                <small>
                  i.e. you have to submit a selfie of yourself holding a paper with a written today's date and an address that matches the
                  withdraw address of the order.
                </small>
                <input type="file" name="whitelist_selfie" id="whitelist_selfie" onChange={this.handleInputChange} accept="image/*" />
              </div>

              <textarea
                name="message"
                className="form-control"
                placeholder="Message (optional)"
                rows="2"
                onChange={this.handleInputChange}
                value={this.state.message}
                maxLength="255"
              />

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.filesReady ? null : 'disabled'}>
                <i
                  className="fa fa-file"
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    left: -8,
                    top: 0,
                    fontSize: '14px',
                  }}
                />
                {this.state.buttonText}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default KYCModalTier2;
