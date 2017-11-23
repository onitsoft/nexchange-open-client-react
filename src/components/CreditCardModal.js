import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import 'react-credit-cards/lib/styles.scss';

import config from '../config';
import Cards from 'react-credit-cards';


class CreditCardModal extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: ''
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

  handleSubmit(event) {
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
      <Modal id="credit-card-modal" show={this.state.show} onHide={this.close}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.close}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title">Pay now</h4>
          </div>

          <div className="modal-body">
            <Cards
              number={this.state.number}
              name={this.state.name}
              expiry={this.state.expiry}
              cvc={this.state.cvc}
              focused={this.state.focused}
            />

            <form id="credit-card-form" onSubmit={this.handleSubmit}>
              {this.state.success  == true ? <h4 className="text-success">Your form has been successfully submitted. We'll get back to you shortly!</h4> : null}
              {this.state.success  == false ? <h4 className="text-danger">Something went wrong during the form submission, please try again later.</h4> : null}

              <div className="form-group is-empty">
                <input type="name" name="name" className="form-control" placeholder="Name" onChange={this.handleInputChange} required />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="telephone" name="telephone" className="form-control" placeholder="Telephone" onChange={this.handleInputChange} />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleInputChange} required />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <div className="form-group is-empty">
                <input type="text" name="subject" className="form-control" placeholder="Subject" onChange={this.handleInputChange} />
                <span className="material-input"></span>
                <span className="material-icons form-control-feedback">clear</span>
              </div>

              <button type="submit" className="btn btn-themed btn-md" disabled={this.state.loading ? "disabled" : null}>
                Pay now
                {this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
              </button>

              <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.close} style={{float:"right", padding: "15px 0 0 0"}}>Close</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreditCardModal;
