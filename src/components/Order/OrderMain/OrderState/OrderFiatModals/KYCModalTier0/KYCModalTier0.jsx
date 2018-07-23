import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserEmail } from 'Actions';
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
      governmentID: '',
      residenceProof: '',
      title: i18n.t('order.fiat.kyc.3'),
      buttonText: i18n.t('order.fiat.kyc.4'),
      titleClass: '',
      email: '',
      message: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.props.email && this.props.email.value) {
      this.setState({
        email: this.props.email.value,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.show !== this.props.show) {
      this.setState({ show: this.props.show }, () => {
        $(function() {
          $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
        });
      });
    }

    if (prevProps.email !== this.props.email) {
      this.setState({
        email: this.props.email.value,
      });
    }
  }

  close() {
    this.props.onClose();

    this.setState({
      filesReady: false,
      governmentID: '',
      residenceProof: '',
      title: i18n.t('order.fiat.kyc.3'),
      buttonText: i18n.t('order.fiat.kyc.4'),
      titleClass: '',
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
    const governmentID = document.querySelector('#governmentID');
    const residenceProof = document.querySelector('#residenceProof');

    formData.append('order_reference', this.props.order.unique_reference);
    formData.append('user_provided_comment', this.state.message.slice(0, 255));

    if (governmentID) {
      formData.append('identity_document', governmentID.files[0]);
    }

    if (residenceProof) {
      formData.append('utility_document', residenceProof.files[0]);
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

    if (this.state.email) {
      this.props.setUserEmail(this.state.email);
    }
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
        let needUploadResidence = document.querySelector('#residenceProof') ? true : false,
          needUploadID = document.querySelector('#governmentID') ? true : false;

        if (
          !this.state.email ||
          (needUploadID && !this.state.governmentID.length) ||
          (needUploadResidence && !this.state.residenceProof.length)
        ) {
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
              {this.props.kyc.id_document_status !== 'APPROVED' && (
                <div>
                  <h2>{t('order.fiat.kyc.1')}</h2>
                  <small>{t('order.fiat.kyc.11')}</small>
                  <input type="file" name="governmentID" id="governmentID" onChange={this.handleInputChange} accept="image/*" />
                </div>
              )}

              {this.props.kyc.residence_document_status !== 'APPROVED' && (
                <div>
                  <h2>{t('order.fiat.kyc.2')}</h2>
                  <small>
                    {t('order.fiat.kyc.21')}
                  </small>
                  <small>
                    {t('order.fiat.kyc.22')}
                  </small>
                  <input type="file" name="residenceProof" id="residenceProof" onChange={this.handleInputChange} accept="image/*" />
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t('generalterms.email')}
                  className="form-control"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />

                <i
                  className="fa fa-question-circle"
                  data-toggle="tooltip"
                  data-placement="left"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 7,
                    zIndex: 99999999,
                  }}
                  data-original-title={t('order.fiat.kyc.6')}
                />
              </div>

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

const mapStateToProps = ({ email }) => ({ email });
const mapDistachToProps = dispatch => bindActionCreators({ setUserEmail }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(KYCModal);
