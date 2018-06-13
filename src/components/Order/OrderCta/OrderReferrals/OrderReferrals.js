import React, { Component } from 'react';
import config from 'Config';
import CopyToClipboard from 'react-copy-to-clipboard';
import OrderReferralTerms from './OrderReferralTerms/OrderReferralTerms';
import Man from './images/man.png';
import styles from '../OrderCta.scss';

class OrderReferrals extends Component {
  state = {
    showTermsModal: false,
    tooltipOpen: false,
    link: `${config.DOMAIN}?ref=${this.props.order.referral_code[0].code}`,
  };

  triggerCopyTooltip = () => {
    $('#copy-to-clipboard-link').tooltip({
      trigger: 'click',
      placement: 'top',
    });

    $('#copy-to-clipboard-link')
      .tooltip('hide')
      .attr('data-original-title', 'Link copied')
      .tooltip('show');

    setTimeout(() => {
      $('#copy-to-clipboard-link').tooltip('destroy');
    }, 1000);
  };

  renderForm() {
    return (
      <div>
        <div className={styles['form-group']}>
          <input className={styles['referral-input']} type="text" value={this.state.link} disabled={true} required />

          <CopyToClipboard text={this.state.link} onCopy={() => this.triggerCopyTooltip()}>
            <button id="copy-to-clipboard-link" type="button" className={`btn btn-primary ${styles.btn}`}>
              Copy link
            </button>
          </CopyToClipboard>

          <h4 className={styles.share}>
            Or share it on social media
            <div className={styles.links}>
              <a className={styles.link} href={`https://facebook.com/sharer.php?u=${this.state.link}`} target="_blank">
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </a>
              <a
                className={styles.link}
                href={`https://twitter.com/intent/tweet?url=${
                  this.state.link
                }&text=I’m%20using%20N.exchange,%20the%20easiest%20and%20fastest%20cryptocurrency%20exchange!`}
                target="_blank"
              >
                <i className="fab fa-twitter" aria-hidden="true" />
              </a>
              <a className={styles.link} href={`https://www.linkedin.com/shareArticle?mini=true&url=${this.state.link}`} target="_blank">
                <i className="fab fa-linkedin-in" aria-hidden="true" />
              </a>
            </div>
          </h4>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className={`box ${styles.container}`}>
          <div className="row">
            <div className="col-xs-12 visible-xs text-center">
              <img className={styles.img} src={Man} alt="Get notified" />
            </div>

            <div className={`col-xs-12 col-sm-7 ${styles.text}`}>
              <h2 className={styles.title}>
                By the way, if you want you can share this unique referral link with your friends to earn some coins!
              </h2>
              {this.renderForm()}
            </div>

            <div className="col-ms-2 col-sm-5 hidden-xs text-center">
              <img className={styles.img} src={Man} alt="Get notified" />
            </div>
          </div>
        </div>

        <OrderReferralTerms show={this.state.showTermsModal} onClose={() => this.setState({ showTermsModal: false })} />
      </div>
    );
  }
}

export default OrderReferrals;
