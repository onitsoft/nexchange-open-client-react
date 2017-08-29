import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import config from '../config';


class Support extends Component {
  constructor(props) {
    super();

    this.state = {
      name: null,
      phone: null,
      email: null,
      order: null,
      subject: null,
      message: null,
      loading: false,
      success: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

      this.setState({loading: false, success: true});
    })
    .catch(error => {
      console.log(error.response);

      this.setState({loading: false, success: false});
    });

    event.preventDefault();
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
      <Modal id="support" show={this.state.show} onHide={this.props.onClose} >
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
                <h3>Phone</h3>
                <p>+442081442192<br/>
                  +16464612858 (US)</p>
              </div>
            
              <div className="col-xs-12 col-sm-6">
                <h3>Email</h3>
                <p><a href="mailto:support@nexchange.io">support@nexchange.io</a></p>
              </div>
            </div>

            <form id="support-form" onSubmit={this.handleSubmit}>
              {this.state.success  == true ? <h4 className="text-success">Your form has been successfully submitted. We'll get back to you shortly!</h4> : null}
              {this.state.success  == false ? <h4 className="text-danger">Something went wrong during the form submission, please try later.</h4> : null}

              <div className="form-group is-empty">
                <input type="name" className="form-control" placeholder="Name" onChange={this.handleInputChange} required />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="phone" className="form-control" placeholder="Telephone" onChange={this.handleInputChange} />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="email" className="form-control" placeholder="Email" onChange={this.handleInputChange} required />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="text" className="form-control" placeholder="Subject" onChange={this.handleInputChange} />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <textarea className="form-control" placeholder="Message" rows="2" onChange={this.handleInputChange} required></textarea>

              <button type="submit" className="btn styled-btn btn-md" disabled={this.state.loading ? "disabled" : null}>
                Send
                {this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
              </button>
              <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} style={{float:"right", padding: "15px 0 0 0"}}>Close</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Support;
