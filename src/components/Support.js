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
      headers: {'Authorization': 'Bearer ' + localStorage.token},
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
            <h4 className="modal-title">Support</h4>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <h3>Phone</h3>
                <p onClick={() => ga('send', 'event', 'General', 'click support number')}>+442081442192<br/>
                  +16464612858 (US)</p>
              </div>
            
              <div className="col-xs-12 col-sm-6">
                <h3>Email</h3>
                <p><a href="mailto:support@nexchange.io">support@nexchange.io</a></p>
              </div>
            </div>

            <form id="support-form" onSubmit={this.handleSubmit}>
              {this.state.success  == true ? <h4 className="text-success">Your form has been successfully submitted. We'll get back to you shortly!</h4> : null}
              {this.state.success  == false ? <h4 className="text-danger">Something went wrong during the form submission, please try again later.</h4> : null}

              {this.state.showForm ? (
                <div>
                  <div className="form-group is-empty">
                    <input type="name" name="name" className="form-control" placeholder="Name" onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group is-empty">
                    <input type="telephone" name="telephone" className="form-control" placeholder="Telephone" onChange={this.handleInputChange} />
                  </div>

                  <div className="form-group is-empty">
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleInputChange} required />
                  </div>

                  <div className="form-group is-empty">
                    <input type="text" name="subject" className="form-control" placeholder="Subject" onChange={this.handleInputChange} />
                  </div>

                  <textarea name="message" className="form-control" placeholder="Message" rows="2" onChange={this.handleInputChange} required></textarea>

                  <button type="submit" className="btn btn-themed btn-md" disabled={this.state.loading ? "disabled" : null}>
                    Send
                    {this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
                  </button>

                  <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.close} style={{float:"right", padding: "15px 0 0 0"}}>Close</button>
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
