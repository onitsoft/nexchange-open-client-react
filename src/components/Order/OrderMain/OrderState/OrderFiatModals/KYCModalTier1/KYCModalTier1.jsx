import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import config from 'Config';
import i18n from '../../../../../../i18n';
import { I18n } from 'react-i18next';

class KYCModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      filesReady: false,
      selfie: '',
      residenceProof: '',
      title: i18n.t('order.fiat.kyc.3'),
      buttonText: i18n.t('order.fiat.kyc.4'),
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
      selfie: '',
      title: i18n.t('order.fiat.kyc.3'),
      titleClass: '',
      buttonText: i18n.t('order.fiat.kyc.4'),
      message: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      title: i18n.t('order.fiat.kyc.uploading'),
      titleClass: 'warning',
      buttonText: i18n.t('order.fiat.kyc.uploading'),
      filesReady: false,
    });

    const formData = new FormData();
    const selfie = document.querySelector('#selfie');

    formData.append('order_reference', this.props.order.unique_reference);
    formData.append('user_input_comment', this.state.message.slice(0, 255));

    if (selfie) {
      formData.append('selfie', selfie.files[0]);
    }

    axios
      .post(`${config.API_BASE_URL}/kyc/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        this.setState({
          title: i18n.t('order.fiat.kyc.status7'),
          titleClass: 'green',
          buttonText: i18n.t('order.fiat.kyc.5'),
          filesReady: false,
        });

        setTimeout(() => {
          this.props.onClose();
        }, 2000);
      })
      .catch(error => {
        this.setState({
          title: i18n.t('order.fiat.kyc.status8'),
          titleClass: 'danger',
          buttonText: i18n.t('order.fiat.kyc.4'),
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
        if (!this.state.selfie.length) {
          this.setState({ filesReady: false });
          return;
        }

        this.setState({ filesReady: true });
      }
    );
  }

  render() {
    return (
    <I18n ns="translations">
    {(t) => (
      <Modal id="kyc-modal" show={this.state.show} onHide={this.close}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.close}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className={`modal-title text-${this.state.titleClass}`}>{this.state.title}</h4>
            <h5 style={{ marginBottom: 0 }}>
              <b>
                {t('order.fiat.tier.explanation')}
              </b>
            </h5>
          </div>

          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              {this.props.kyc.selfie_document_status !== 'APPROVED' && (
                <div style={{ marginBottom: 45 }}>
                  <h2>{t('order.fiat.tier.selfie')}</h2>
                  <small>
                    {t('order.fiat.tier.selfieexplanation')}
                  </small>
                  <input type="file" name="selfie" id="selfie" onChange={this.handleInputChange} accept="image/*" />
                </div>
              )}

              <textarea
                name="message"
                className="form-control"
                placeholder={t('order.fiat.kyc.msg')}
                rows="2"
                onChange={this.handleInputChange}
                value={this.state.message}
                maxLength="255"
              />

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.filesReady ? null : 'disabled'}>
                <i
                  className="far fa-file"
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
      )}
      </I18n>
    );
  }
}

export default KYCModal;
