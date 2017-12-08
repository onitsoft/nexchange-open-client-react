import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import QuestionAnswer from './QuestionAnswer'

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.onClose} >
        <div id="faq" className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
          </div>

          <div className="modal-body">
            <QuestionAnswer
              question="Who are you?"
              answer={
                <div>
                  <p>Nexchange is an automated cryptocurrency exchange service, operated by <a href="https://beta.companieshouse.gov.uk/company/10009845" target="_blank">YOA LTD. (registered company No. 10009845)</a>.</p>
                  <p>Our VAT number - GB233 5420 37.<br/>Our registered office address - Suite 11, Penhurst House, 352-254 Battersea Park Road, London, England, SW11 3BY.</p>
                  <p>Our customer support phone number in UK is <a href="tel:+442081442192">+442081442192</a>.</p>
                </div>
              }/>

            <QuestionAnswer
              question="What do you do?"
              answer={
                <div>
                  <p>We allow you to exchange one cryptocurrency for another. To view our currently supported coins, please click on the coin selection widget in the top of fold of the page.</p>
                  <p>We will be adding more currencies very soon, stay tuned!</p>
                  <p>Missing your favorite coin? Let us know here: <a href="mailto:support@nexchange.io">support@nexchange.io</a>.</p>
                </div>
              }/>

            <QuestionAnswer
              question="What is your fee?"
              answer={
                <p>Our service fee is 0.5%. There are no hidden fees here: the amount you see on the screen is the exact amount you get in your wallet.</p>
              }/>  

            <QuestionAnswer
              question="How long does the exchange process take?"
              answer={
                <p>Initiating a transaction doesn’t take more than a couple of minutes. The actual processing takes about 10–60 minutes before you receive your coins in your desired currency. The transaction time depends on the selected currencies and their respective blockchains.</p>
              }/> 

            <QuestionAnswer
              question="How does it work?"
              answer={
                <div>
                  <p>Here is how you use the exchange:</p>
                  <ol>
                    <li>
                      <b>Enter</b> your desired <b>amount, choose</b> the currency type you <b>want to spend</b>, and the currency type you <b>want to buy</b> (e.g. if you want to spend 1 BTC to buy ETH at the exchange rate shown, you enter “1” and click on “GET STARTED”)
                      <img src="/img/step1.png" alt="How does it work, step 1" />
                    </li>
                    <li>
                      <b>Enter your destination address</b> (e.g. if you are buying ETH, you enter your ETH wallet address)
                      <img src="/img/step2.png" alt="How does it work, step 2" />
                    </li>
                    <li>
                      You will be prompted to <b>send</b> your coins to a <b>specified address</b>.
                      <img src="/img/step3.png" alt="How does it work, step 3" />
                    </li>
                    <li>Once we receive your coins, the processing of your order will start immediately.</li>
                    <li>Once everything is done, you will receive your ETH. Hurray! You just successfully exchanged your cryptocurrency.</li>
                  </ol>
                  <p>Once you have paid for your order, it cannot be reversed. Please ensure that you have put in the right address.</p>
                </div>
              }/>

            <QuestionAnswer
              question="Do you collect any private information?"
              answer={
                <p>We do not collect or store any private information about you. The process is completely anonymous.</p>
              }/>

            <QuestionAnswer
              question="Are you using a third-party exchange or API?"
              answer={
                <p>No, our solution is completely independant. We use our internal coin reserves to provide liquidity.</p>
              }/> 

            <QuestionAnswer
              question="How do you manage security?"
              answer={
                <div>
                  <p>We do not provide wallet hosting service at the moment. The exchange happens between two of your wallets:</p>
                  <ol>
                    <li>The wallet you send the funds from (<b>spending</b> wallet)</li>
                    <li>The wallet you receive funds to (<b>receiving</b> wallet)</li>
                  </ol>
                  <p>Once the transaction has been processed, you are in charge of your wallet balance security.</p>
                </div>
              }/>

            <QuestionAnswer
              question="How do I track my order?"
              answer={
                <div>
                  <p>Every order has a unique id like this:</p>
                  <img src="/img/faq.png" style={{margin: "10px 0"}} alt="Order ID example" />
                  <p>Make sure you record your order id. We recommend bookmarking the page, you can always navigate to it later.</p>
                  <p>Once you have sent the cryptocurrency, losing connection, closing the tab or navigating elsewhere will not impact the transaction.</p>
                  <p>If you need help, feel free to contact us.</p>
                </div>
              }/>

            <QuestionAnswer
              question="How do referrals work?"
              answer={
                <div>
                  <p>Whenever you create an order, a referral code is automatically generated for you.</p>
                  <p>Current referral conditions are as follows:</p>
                  <ol>
                    <li>We pay $5 worth of your receive currency on this order, per each person referred.</li>
                    <li>We send payments in aggregate each end of day.</li>
                    <li>You will be receiving your funds to the withdraw address specified on this order.</li>
                    <li>If you would like to change withdrawal address or preferred currency, let us know in support, and we will take care of it.</li>
                  </ol>
                  <p>These are subject to change at any time.</p>
                </div>
              }/>

            <QuestionAnswer
              question="I see a 15-minute timer on my order window, what happens when it runs out?"
              answer={
                <div>
                  <p>There's a 15-minute window between the moment you open the order and the moment we detect the coins that you sent on the blockchain. During this time interval, we effectively freeze the price for your order.</p>
                  <p>If the 15 minute time window closes, the order is canceled because the price will have expired and will need to be recalculated.</p>
                  <p>If you did not send your funds in time, simply initiate a new order.</p>
                  <p>If you did send your funds, but for some reason they were not detected, contact us through the support chat and we will help you out.</p>
                </div>
              }/>

            <QuestionAnswer
              question="Do you have any promotions running at the moment?"
              answer={
                <div>
                  <p>Yes. We are currently running a bonus coins promotion. The rules are simple:</p>
                  <ol>
                    <li>Make a trade on our platform.</li>
                    <li>Post a positive social status about us.</li>
                    <li>Send us the links to your order and your social status in the support chat on the website.</li>
                    <li>Receive 100% of your trade size to your wallet.</li>
                  </ol>

                  <p>Limitations:</p>
                  <ol>
                    <li>The reward is up to a $10 ceiling. If you trade more than $10 worth of cryptocurrency,  you will only receive $10.</li>
                    <li>Your social account must be at least one year old and have over 200 followers.</li>
                  </ol>

                  <p><b>We reserve the right to deny the bonus coins on any grounds we see fit.</b></p>
                </div>
              }/>

            <QuestionAnswer
              question="What does the beta version include?"
              answer={
                <p>At the moment, only the core exchange feature of our product is available for users to enjoy as part of our public beta initiative, which means that everything you see on screen works perfectly. Our goal with the beta is to expose Nexchange to as many users as possible in order to fine-tune our design and user experience to the highest possible degree. To achieve this goal, your input as a user is invaluable. If you have any feedback for us, please feel free to contact us at <a href="mailto:support@nexchange.io">support@nexchange.io</a>.</p>
              }/>

            <QuestionAnswer
              question="Do I need a wallet? How do I get one?"
              answer={
                <div>
                  <p>In order to use Nexchange, you need to have your own wallet. The main upside of this feature is that we don’t hold your coins, and thus you retain full control over your assets at all times.</p>
                  <p>If you need some help obtaining a wallet for your desired cryptocurrency, please look here:</p>
                  <ul>
                    <li>Bitcoin (BTC): <a href="https://bitcoin.org/en/choose-your-wallet">https://bitcoin.org/en/choose-your-wallet</a></li>
                    <li>Ethereum (ETH): <a href="https://github.com/ethereum/mist/releases">https://github.com/ethereum/mist/releases</a></li>
                    <li>Litecoin (LTC): <a href="https://litecoin.org/">https://litecoin.org/</a></li>
                  </ul>

                  <p>Please note that we are not affiliated with the websites mentioned above, these links are for user’s reference purposes only. We will not accept any liability, obligation or responsibility whatsoever for the content of external websites.</p>
                </div>
              }/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default FAQ;
