import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

import config from '../config';


class CreditCardModal extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: 'false',
      errors: {
        number: '',
        name: '',
        expiry: '',
        cvc: ''
      }
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

    this.props.onClose();
    this.props.successfulPayment();
  }

  close() {
    this.props.onClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'number') {
      value = value.replace(/[^0-9 \,]/, '').replace(/\s/g, '');

      if (value.length > 16)
        value = value.slice(0, value.length-1);
    }

    if (name === 'expiry') {
      if (value.length > this.state.expiry.length) {
        value = value.replace(/[^0-9 \,]/, '');
        if (value.length > 4)
          value = value.slice(0, value.length-1);

        if (value.length >= 2)
          value = value.slice(0,2) + '/' + value.slice(2, value.length);
      } else {
        if (value.length == 3) {
          value = value.replace(/[^0-9 \,]/, '');
        }
      }
    }

    if (name === 'cvc' && value.length > 3) {
      value = value.slice(0, value.length-1);
    }

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
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Cards
                  number={this.state.number}
                  name={this.state.name}
                  expiry={this.state.expiry}
                  cvc={this.state.cvc}
                  focused={this.state.focused}
                />
              </div>

              <div className="col-xs-12 col-sm-6">
                <form id="credit-card-form" onSubmit={this.handleSubmit}>
                  {this.state.success  == true ? <h4 className="text-success">Your form has been successfully submitted. We'll get back to you shortly!</h4> : null}
                  {this.state.success  == false ? <h4 className="text-danger">Something went wrong during the form submission, please try again later.</h4> : null}

                  <div className="form-group label-floating">
                    <input type="text" name="name" className="form-control" placeholder="Your name" onChange={this.handleInputChange} value={this.state.name} required />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <div className={`form-group label-floating ${this.state.errors.number.length ? 'has-error' : ''}`}>
                    {this.state.errors.number.true ?
                      <label className="control-label">{this.state.errors.number.message}</label>
                      : null
                    }
                    <input type="text" name="number" className="form-control" placeholder="•••• •••• •••• ••••" onChange={this.handleInputChange} value={this.state.number} required />
                    <span className="material-input"></span>
                    <span className="material-icons form-control-feedback">clear</span>
                  </div>

                  <div className="row">
                    <div className="col-xs-6">
                      <div className="form-group label-floating">
                        <input type="text" name="expiry" className="form-control" placeholder="MM/YY" onChange={this.handleInputChange} value={this.state.expiry} required />
                        <span className="material-input"></span>
                        <span className="material-icons form-control-feedback">clear</span>
                      </div>
                    </div>

                    <div className="col-xs-6">
                      <div className="form-group label-floating">
                        <input type="number" name="cvc" className="form-control" placeholder="CVC" onChange={this.handleInputChange} value={this.state.cvc} required />
                        <span className="material-input"></span>
                        <span className="material-icons form-control-feedback">clear</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-themed btn-md" disabled={this.state.loading ? "disabled" : null}>
                    Pay now
                    {this.state.loading ? <i className="fa fa-spinner fa-spin" style={{marginLeft: "10px"}}></i> : null}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreditCardModal;
