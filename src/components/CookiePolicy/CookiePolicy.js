import React from 'react';
import { I18n } from 'react-i18next';

const CookiePolicy = () => {
  return (
    <I18n ns="translations">
      {t => (
        <div className="container terms">
          <div className="row">
            <div className="col-xs-12">

              <h2 style={{ marginTop: 100, marginBottom: 0 }}>Cookie Policy</h2>
              <h4 style={{ marginBottom: 30 }}>
                Last updated: <strong>December 9th, 2021</strong>
              </h4>

              <p>
                Yoa Ltd (hereinafter referred to as “we”, “us”, “Yoa.ltd”, or “our”) uses cookies and other similar technologies for
                accessing or storage of information on the end user's terminal equipment. You can find out more about cookies and other
                similar technologies and how to control them in the information below.
              </p>
              <p>
                If you do not accept the use of these technologies please disable them following the instructions in this Web Site Policy,
                for instance by clicking the Cookie Settings link (from our cookie banner) or changing your browser settings.
              </p>

              <h3>What is a cookie and Local Storage?</h3>
              <ul>
                <li>
                  Cookies are text files containing small amounts of information which are downloaded to your device when you visit a
                  website. Cookies are then sent back to the originating website on each subsequent visit, or to another website that
                  recognizes that cookie. Cookies are useful because they allow a website to recognize a user’s device. You can find more
                  information about cookies at:{' '}
                  <a target="_blank" href="www.allaboutcookies.org" rel="noreferrer">
                    www.allaboutcookies.org
                  </a>
                  .
                </li>
                <li>
                  Local Storage is a new way of storing (structured) data on a client’s computer. Local Storage behaves more like persistent
                  cookies in terms of expiration. We use local storage to customize what we show you based on your past interactions with
                  our services. Highly vulnerable data, such as financial information, is not stored or secured using Local Storage.
                </li>
              </ul>

              <h3>What Local Storage do we use on Yoa.ltd?</h3>
              <ul>
                <li>Session Storage is stored temporarily. Session Storage files are automatically deleted when you close your browser.</li>
                <li>
                  Local Storage is persistent. You may erase them by deleting your browser’s history. We remove data from Local Storage
                  within 3 months after you close your account.
                </li>
              </ul>

              <h3>What cookies do we use on Yoa.ltd?</h3>
              <p>
                Strictly necessary cookies are essential for the website to operate properly. These cookies enable you to navigate the
                website and use its features. For example, a so-called ”session” cookie which makes sure that you don’t have to keep logging
                in on every page you visit and that keeps track of your account and provides online banking services.
              </p>
              <p>
                Session cookies do not have an expiration date. Instead, they are stored only as long as the browser or tab is open. As soon
                as the browser is closed, they are permanently lost. For instance, those type of cookies are used to store a banking user’s
                credentials while they are navigating within their bank’s website since their information would be forgotten as soon as the
                tab is closed.
              </p>
              <p>User consent is not required for the delivery of Strictly necessary cookies.</p>
              <p>
                Performance cookies collect information about how visitors use a website, for instance which pages visitors go to most
                often, and if they get error messages from web pages. It is only used to improve how a website works. These cookies identify
                which pages are being used and help us analyze data about web page traffic and improve our website in order to tailor it to
                customer needs. This category does not include cookies used for behavioral/targeted advertising networks.
              </p>
              <p>
                According to the Article 29 Opinion (footnote 2) first party analytics cookies require user consent. Such analytics cookies
                are less intrusive. Functionality cookies allow the website to remember choices you make (such as your user name, language
                or the region you are in) and provide enhanced, more personal features. These cookies can also be used to remember changes
                you have made to text size, fonts and other parts of web pages that you can customize and remember choices you make to
                improve your experience.
              </p>
              <p>
                Targeting cookies or third-party advertising cookies allow advertising to be tailored to your interests, both on our website
                and as you browse the web after leaving our website. They are usually placed by advertising networks with the website
                operator’s permission. They remember that you have visited a website and this information is shared with other organizations
                such as advertisers. These cookies collect information about your browsing habits in order to make advertising relevant to
                you and your interests.
              </p>
              <p>
                Targeting cookies or third-party advertising cookies require user consent (amended ePrivacy Directive Article 5(3)) before
                cookies can be accessed or stored on your device. You may refuse the use of cookies by selecting the appropriate settings on
                your browser, however please note that if you do so, you may not be able to use the full functionality of this website
              </p>
              <p>
                We use Google Analytics, a web analytics service provided by Google, Inc. (`"`Google`"`). The information associated with
                the cookie about your use of the website (including your IP address) may be transmitted to and stored by Google on its
                servers. You may also opt out of personalized advertising by Google by visiting Ads Settings. To find out more about
                Google’s data collection and processing practices, please read its Privacy Policy. We follow Google’s recommendations for
                remarketing to our website visitors and merchants.
              </p>
              <p>
                We collect and process this information, for (i) understanding how people use our services in order to ensure and improve
                the performance of those services, (ii) customizing our services to provide you with a better user experience, (iii)
                providing, maintaining and improving our services to meet the needs of our users, and other.
              </p>
              <p>
                If you are located in the European Union, the transfer of your information from the EEA to the United States is permitted
                under the Article 45 of the General Data Protection Regulation (GDPR), as Google adheres to the EU-US Privacy Shield
                self-regulatory framework. You can find the details of the framework{' '}
                <a target="_blank" href="https://www.privacyshield.gov/list" rel="noreferrer">
                  here
                </a>
                .
              </p>
              <p>
                We use an Intercom cookie. These cookies enable the functionality of a chat. You can find Intercom cookie policy{' '}
                <a target="_blank" href="https://www.intercom.com/legal/privacy" rel="noreferrer">
                  here
                </a>
                . Intercom Inc has certified to the EU-U.S. and Swiss-U.S.{' '}
                <a target="_blank" href="https://www.privacyshield.gov/participant?id=a2zt0000000TNQvAAO" rel="noreferrer">
                  Privacy Shield FrameWork
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </I18n>
  );
};

export default CookiePolicy;
