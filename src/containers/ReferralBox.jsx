import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import config from '../config';
import ReferralTerms from '../components/ReferralTerms';
import Box from '../components/Box';

class ReferralBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTermsModal: false,
    };
  }

  render() {
    return (
	  <I18n ns="translations">
		{(t) => (
      <Box id="share-referral">
        <h2>
          {t('referral.1')}
        </h2>
        <h4>
          {t('referral.2')}:{' '}
          <a
            href={`${config.DOMAIN}?ref=${
              this.props.order.referral_code[0].code
            }`}
            className="text-green"
            target="_blank"
            onClick={this.trackRefShare}
          >
            {config.DOMAIN}/?ref={this.props.order.referral_code[0].code}
          </a>
        </h4>
        <h4>
          <a
            href="javascript:void(0)"
            onClick={() => this.setState({ showTermsModal: true })}
          >
            {t('referral.3')}
          </a>
        </h4>

        <h4>{t('referral.a')}</h4>

        <div className="share">
          <a
            href={`https://facebook.com/sharer.php?u=${config.DOMAIN}?ref=${
              this.props.order.referral_code[0].code
            }`}
            target="_blank"
            onClick={this.trackRefShare}
          >
            <i className="fa fa-facebook-official" aria-hidden="true" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${config.DOMAIN}?ref=${
              this.props.order.referral_code[0].code
            }&text=${t('referral.twitter')}`}
            target="_blank"
            onClick={this.trackRefShare}
          >
            <i className="fa fa-twitter-square" aria-hidden="true" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${
              config.DOMAIN
            }?ref=${this.props.order.referral_code[0].code}`}
            target="_blank"
            onClick={this.trackRefShare}
          >
            <i className="fa fa-linkedin-square" aria-hidden="true" />
          </a>
        </div>

        <ReferralTerms
          show={this.state.showTermsModal}
          onClose={() => this.setState({ showTermsModal: false })}
        />
      </Box>
	 )}</I18n>
    );
  }
}

export default ReferralBox;
