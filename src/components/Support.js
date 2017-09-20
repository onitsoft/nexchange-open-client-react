import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import config from '../config';


class Support extends Component {
  constructor(props) {
    super();

    this.state = {
      name: null,
      telephone: null,
      email: null,
      order: null,
      subject: null,
      message: null,
      loading: false,
      success: null,
      showForm: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  handleSubmit(event) {
    this.setState({loading: true});

    console.log(this.state.email,
        this.state.name,
        this.state.telephone,
        this.state.message,
        this.state.subject,
        this.state.message)

    axios({
      method: 'post',
      contentType : 'application/json',
      url: `${config.API_BASE_URL}/support/`,
      data: {
        email: this.state.email,
        name: this.state.name,
        telephone: this.state.telephone,
        message: this.state.message,
        subject: this.state.subject,
        message: this.state.message
      }
    })
    .then(response => {
      console.log(response.data)

      this.setState({loading: false, showForm: false, success: true});
    })
    .catch(error => {
      console.log(error.response);

      this.setState({loading: false, showForm: false, success: false});
    });

    event.preventDefault();
  }

  close() {
    this.setState({success: null, showForm: true});
    this.props.onClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Modal id="support" show={this.state.show} onHide={this.close}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.close}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">Bize Yazın</h4>
          </div>

          <div className="modal-body">
            <div className="row">

            
              <div className="col-xs-12 col-sm-6">
                <p><a href="mailto:destek@kriptoburosu.com">destek@kriptoburosu.com</a></p>
              </div>
            </div>

            <form id="support-form" onSubmit={this.handleSubmit}>
              {this.state.success  == true ? <h4 className="text-success">Başarıyla gönderildi. Size en kısa zamanda dönüş yapacağız.</h4> : null}
              {this.state.success  == false ? <h4 className="text-danger">Ters giden bir şeyler var. Lütfen daha sonra tekrar deneyin.</h4> : null}

              {this.state.showForm ? (
                <div>
                  <div className="form-group is-empty">
                    <input type="name" name="name" className="form-control" placeholder="İsim" onChange={this.handleInputChange} required />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <div className="form-group is-empty">
                    <input type="telephone" name="telephone" className="form-control" placeholder="Telefon" onChange={this.handleInputChange} />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <div className="form-group is-empty">
                    <input type="email" name="email" className="form-control" placeholder="E-posta" onChange={this.handleInputChange} required />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <div className="form-group is-empty">
                    <input type="text" name="subject" className="form-control" placeholder="Konu" onChange={this.handleInputChange} />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <textarea name="message" className="form-control" placeholder="Mesaj" rows="2" onChange={this.handleInputChange} required></textarea>

                  <button type="submit" className="btn btn-themed btn-md" disabled={this.state.loading ? "disabled" : null}>
                    Gönder
                    {this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
                  </button>

                  <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.close} style={{float:"right", padding: "15px 0 0 0"}}>Vazgeç</button>
                </div>
              ) : <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.close} style={{padding: "0"}}>Close</button>}
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Support;
