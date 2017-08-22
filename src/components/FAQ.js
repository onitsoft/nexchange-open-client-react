import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

class FAQ extends Component {
  constructor(props) {
    super();

    this.state = {
      showModal: false
    }
  }

  componentDidUpdate() {
    if (this.state.showModal != this.props.showModal) {
      this.setState({
        showModal: this.props.showModal
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.props.onClose} >
        <div id="faq-modal" className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
          </div>

          <div className="modal-body">
            <h3>Who are you?</h3>
            <p>Nexchange is an automated cryptocurrency exchange service, operated by <a href="https://beta.companieshouse.gov.uk/company/10009845">YOA LTD. (registered in United Kingdom)</a>.</p>
            <p>Our customer support phone number is +442081442192.</p>

            <h3>What do you do?</h3>
            <p>We allow you to exchange one cryptocurrency for another. Currently, we support Bitcoin (BTC), Ethereum (ETC) and Litecoin (LTC). We will be adding more currencies very soon, stay tuned!</p>
            <p>Missing your favorite coin? Let us know here: <a href="mailto:support@nexchange.co.uk">support@nexchange.co.uk</a>.</p>

            <h3>What is your fee?</h3>
            <p>Our service fee is 0.5%. There are no hidden fees here: the amount you see on the screen is the exact amount you get in your wallet.</p>

            <h3>How long does a conversion take?</h3>
            <p>Initiating a transaction doesn’t take more than a couple of minutes. The actual processing takes about 5–10 minutes before you receive your coins in your desired currency.</p>

            <h3>How does it work?</h3>
            <p>Here is how you use the exchange:</p>
            <ol>
              <li><b>Enter</b> your desired <b>amount, choose</b> the currency type you <b>want to spend</b>, and the currency type you <b>want to buy</b> (e.g. if you want to spend 1 BTC to buy ETH at the exchange rate shown, you enter “1” and click on “GET STARTED”)</li>
              <li><b>Enter your destination address</b> (e.g. if you are buying ETH, you enter your ETH wallet address)</li>
              <li>You will be prompted to <b>send</b> your Bitcoins to a <b>specified address</b>.</li>
              <li>Once we receive your coins, the processing of your order will start immediately.</li>
              <li>Once everything is done, you will receive your ETH. Hurray! You just successfully exchanged your cryptocurrency.</li>
            </ol>
            <p>Once you have paid for your order, it cannot be reversed. Please ensure that you have put in the right address.</p>
            <p>In case of an issue, your order will be refunded to your original wallet.</p>

            <h3>Do you collect any private information?</h3>
            <p>We do not collect or store any private information about you. The process is completely anonymous.</p>

            <h3>Are you using a third-party exchange or API?</h3>
            <p>No, our solution is completely independant. We use our internal coin reserves to provide liquidity.</p>

            <h3>How do you manage security?</h3>
            <p>We do not provide wallet hosting service at the moment. The exchange happens between two of your wallets:</p>
            <ol>
              <li>The wallet you send the funds from (<b>spending</b> wallet)</li>
              <li>The wallet you receive funds to (<b>receiving</b> wallet)</li>
            </ol>
            <p>Once the transaction has been processed, you are in charge of your wallet balance security.</p>

            <h3>How do I track my order?</h3>
            <p>Every order has a unique id that looks like this: INSERT PICTURE</p>
            <p>Make sure you record your order id. We recommend bookmarking the page, you can always navigate to it later.</p>
            <p>Once you have sent the cryptocurrency, losing connection, closing the tab or navigating elsewhere will not impact the transaction.</p>
            <p>If you need help, feel free to contact us.</p>

            <h3>What does the beta version include?</h3>
            <p>At the moment, only the core exchange feature of our product is available for users to enjoy as part of our public beta initiative, which means that everything you see on screen works perfectly. Our goal with the beta is to expose Nexchange to as many users as possible in order to fine-tune our design and user experience to the highest possible degree. To achieve this goal, your input as a user is invaluable. If you have any feedback for us, please feel free to contact us at <a href="mailto:support@nexchange.co.uk">support@nexchange.co.uk</a>.</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} >Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default FAQ;
