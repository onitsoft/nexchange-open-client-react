import React from 'react';
import { I18n } from 'react-i18next';

const Privacy = props => {
  window.scrollTo(0, 0);
  return (
    <I18n ns="translations">
      {t => (
        <div className="container terms">
          <div className="row">
            <div className="col-xs-12" style={{ marginTop: 80 }}>
              {/* eslint max-len: ["error", { "code": 9999 }] */}
              <h2>{t('privacy.title')}</h2>
              <h4 style={{ marginBottom: 30 }}>
                Last updated: <strong>April 3rd, 2019</strong>
              </h4>

              <p>DRAGONDEX Privacy Policy:</p>

              <p>Australian Privacy Policy (APP)</p>

              <p>
                'Welcome to DRAGONDEX. Our website allows you to swap (exchange) cryptocurrencies with cryptocurrencies. All from your
                private wallets.'
              </p>

              <p>DRAGONDEX PTY LTD. </p>

              <p>We're committed to protecting your privacy.</p>

              <p>
                DRAGONDEX PTY LTD ACN 631 949 356 (referred to as 'we', 'our', 'us', 'DRAGONDEX') is bound by the Privacy Act 1988 Cth,
                including the Australian Privacy Principles.
              </p>

              <p>
                We, DRAGONDEX, are an affiliate of n.exchange (YOA LTD. Registered Company No 10009845) - a London, England based Automated
                Cryptocurrency Exchange Service.
              </p>

              <p>
                Process: [function 1] DRAGONDEX facilitates cryptocurrency to crypocurrency swaps (exchanges). [function 2] n.exchange, (of
                which DRAGONDEX is an affiliate), facilitates fiat to cryptocurrency swaps (exchanges).
              </p>

              <p>
                Describe your entity&rsquo;s functions and activities: DRAGONDEX allows an individual to swap (exchange) cryptocurrency for
                cryptocurrency only [function 1]. - we don't require individuals to set up an account. - we do not keep records, log data or
                disclose data about an individual's transactions. - the individual is essentially anonymous when making cryptocurrency to
                cryptocurrency swaps (exchange) on DRAGONDEX.COM.AU.{' '}
              </p>

              <p>
                Example [function 1]: DRAGONDEX allows users to swap (exchange) Bitcoin for Ethereum from a private Bitcoin wallet to a
                private Ethereum wallet. The individual holds their own keys. No data is logged, stored or disclosed during the swap
                (exchange).
              </p>

              <p>
                Fiat to Cryptocurrency [function 2]: - 'Fiat to cryptocurrency' functionality is provided by n.exchange. - DRAGONDEX PTY LTD
                is an affiliate of n.exchange (YOA LTD. Registered Company No 10009845) a London, England based Automated Cryptocurrency
                Exchange Service. - When selecting 'fiat to cryptocurrency' on DRAGONDEX you will be redirected to n.exchange. A transition
                page will be displayed informing the individual that they are being redirected from DRAGONDEX.COM.AU (DRAGONDEX PTY LTD) to
                n.exchange (YOA LTD. Registered Company No 10009845) to make a 'fiat to cryptocurrency' swap (exchange). - It is recommended
                that you read n.exchange's Privacy Policy and Terms and Conditions before making a transaction (exchange). - KYC/AML: ID
                verification will need to be provided for 'fiat to cryptocurrency' functionality. - Process involves account creation. -
                Data will be collected and held for KYC/AML compliance by n.exchange. For full details see n.exchange's Privacy Policy and
                Terms and Conditions.
              </p>

              <p>
                Example [function 2]: AUD can be swapped (exchanged) for Bitcoin. The Bitcoin will be deposited into the users private
                wallet. The individual holds their own keys. [Service provided by n.exchange. DRAGONDEX is an affiliate. Individuals will be
                redirected from DRAGONDEX.COM.AU to n.exchange via a transition page].
              </p>

              <p>
                Running a website: DRAGONDEX.COM.AU is the Official Website Address of DRAGONDEX. Be sure to look for the 'lock' symbol and
                make sure &quot;connection is secure&quot;. n.exchange is the website we, DRAGONDEX, are an Affiliate of.
              </p>

              <p>
                Conducting Publicity Campaigns: Campaigns and publicity - may be conducted though email via n.exchange's email database.
                Correspondence may be collected. - may appear in advertised search results. Analytics may be collected.
              </p>

              <p>
                Information collected via 3rd Party We may at times collect information via 3rd Parties (advertisers). As a result -
                analytics such as views, clicks and browsing habits may be stored by our advertising partners for our viewing.{' '}
              </p>

              <p>
                Contact support: DRAGONDEX prides itself on openness and transparency. Support for DRAGONDEX - Maintained by n.exchange -
                support@n.exchange
              </p>

              <p>
                Handling complaints: To contact support or to make a complaint, please email: support@n.exchange Please address complaints
                to our Privacy or Compliance Officer.
              </p>

              <p>
                Accessing and seeking correction of Personal Information: DRAGONDEX does not keep records, log data or disclose data about
                individual's transactions - we do not collect or store personal information about you. We do not have a database to update.
              </p>

              <p>
                Likely Overseas Disclosure: DRAGONDEX is affiliated with n.exchange which is based in London, England. Personal information
                such as your email address and name may be collected when contacting support. This is collected for the purpose of answering
                questions and resolving issues.
              </p>

              <p>
                An individual can complain about an APP entity&rsquo;s breach of the APPs or a binding registered APP code (APP 1.4(e)):
                Please contact support@n.exchange if you suspect a brech of the APPs.
              </p>

              <p>
                Cookies: We may at times use cookies to collect information such as web visits (traffic) and page views. We use this to
                enhance individuals online experience.
              </p>

              <p>
                Handling of Unsolicited Personal Information: We may receive unsolicited personal information about you. We will destroy all
                unsolicited personal information we receive in a timely manner, unless it is relevant to our purposes for collecting
                personal information.{' '}
              </p>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default Privacy;
