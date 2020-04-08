import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';
import Fuse from 'fuse.js';
import debounce from 'Utils/debounce';
import i18n from 'Src/i18n';

import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import Support from '../Header/Support/Support';
import styles from './FAQ.scss';

const FAQ_COUNT = 6;

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.faqs = [];
    this.state = {
      loading: true,
      searchText: '',
      filteredQuestionsIds: Array(FAQ_COUNT)
        .fill()
        .map((e, i) => i + 1),
      showSupportModal: false,
      subject: '',
    };
  }

  UNSAFE_componentWillMount() {
    window.gtag('event', 'FAQs open', { event_category: 'FAQ', event_label: `` });
  }

  showQuestion(id) {
    return this.state.filteredQuestionsIds.indexOf(id) !== -1;
  }

  closeSupportModal = () => this.setState({ showSupportModal: false });
  openSupportModal = subject => {
    this.setState({ showSupportModal: true, subject });
  };

  componentDidUpdate() {
    if (this.state.loading) {
      //Populate local FAQ Array
      const faqIdArray = Array(FAQ_COUNT)
        .fill()
        .map((e, i) => i + 1);
      let faqs = [];
      faqIdArray.forEach(id => {
        let faq = {
          id,
          question: i18n.t(`faq.ques${id}`),
          answer: i18n.t(`faq.ans${id}`),
        };
        faqs.push(faq);
      });
      this.faqs = faqs;

      //Show modal
      this.setState({
        loading: false,
      });
    }
  }

  handleChange(event) {
    const searchText = event.target.value;

    if (_.isEmpty(searchText.trim())) {
      this.setState({
        searchText: '',
        filteredQuestionsIds: Array(FAQ_COUNT)
          .fill()
          .map((e, i) => i + 1),
      });
      return;
    }

    const fuse = new Fuse(this.faqs, {
      shouldSort: true,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: ['question', 'answer'],
    });

    this.trackEvent(searchText);
    const searchResult = fuse.search(searchText);
    if (_.isEmpty(searchResult)) {
      window.gtag('event', 'FAQ not found', { event_category: 'FAQ', event_label: `${searchText}` });
    }

    const filteredQuestionsIds = _.sortBy(_.map(searchResult, 'id'));

    this.setState({
      searchText,
      filteredQuestionsIds,
    });
  }

  trackEvent = debounce(faqSearched => {
    window.gtag('event', 'FAQ searched', { event_category: 'FAQ', event_label: `${faqSearched}` });
  }, 100);

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className={styles.container}>
            <div className="container">
              <div className="col-xs-12">
                <div className={styles.brand}>
                  <h1>{t('faq.heading1')}</h1>
                  <h2>{t('faq.heading2')}</h2>
                </div>
              </div>
              <div className={`col-xs-12 ${styles.faqs}`}>
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <div className={`${styles.input}`}>
                    <i className={`fas fa-search`} />
                    <input
                      type="text"
                      className={`form-control`}
                      id="faq-search"
                      value={this.state.searchText}
                      onChange={event => this.handleChange(event)}
                      placeholder={t('faq.inputplaceholder')}
                    />
                  </div>
                </form>

                {_.isEmpty(this.state.filteredQuestionsIds) ? (
                  <div className={styles.notfound}>
                    <h3>{t('faq.notfound')}</h3>
                    <a onClick={() => this.openSupportModal(this.state.searchText)}>{t('faq.openticket')}</a>
                  </div>
                ) : (
                  <div id="faq.list" className={styles.list}>
                    {this.showQuestion(1) ? (
                      <QuestionAnswer
                        id="ques1"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <div>
                            <div>
                              <p>DRAGONDEX is located in Australia.</p>
                              <p>The exchange platform is accessible globally.</p>
                            </div>
                          </div>
                        }
                      />
                    ) : null}

                    {this.showQuestion(2) ? (
                      <QuestionAnswer
                        id="ques2"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <div>
                            <div>
                              <p>DRAGONDEX transfers are instant.</p>
                              <p>The transaction time depends on the blockchain.</p>
                            </div>
                          </div>
                        }
                      />
                    ) : null}

                    {this.showQuestion(3) ? (
                      <QuestionAnswer
                        id="ques3"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <div>
                            <p>In order to use DRAGONDEX you need to have your own wallet.</p>
                            <p>MetaMask functionality has been provided.</p>
                          </div>
                        }
                      />
                    ) : null}

                    {this.showQuestion(4) ? (
                      <QuestionAnswer
                        id="ques4"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <Trans i18nKey="faq.ans4">
                            <p>
                              A decentralised exchange is an exchange market that does not rely on a third-party service to hold the
                              individuals's funds. Instead, trades occur directly between users (peer-to-peer) through an automated process.
                            </p>
                          </Trans>
                        }
                      />
                    ) : null}

                    {this.showQuestion(5) ? (
                      <QuestionAnswer
                        id="ques5"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <div>
                            <p>Example</p>
                            <img src="/img/Orders_page_1 – 1.png" alt="faqimage" />
                          </div>
                        }
                      />
                    ) : null}

                    {this.showQuestion(6) ? (
                      <QuestionAnswer
                        id="ques6"
                        openSupportModal={this.openSupportModal}
                        answer={
                          <div>
                            <p>Example</p>
                            <img src="/img/Orders_page_1 – 2.png" alt="faqimage" />
                          </div>
                        }
                      />
                    ) : null}
                  </div>
                )}
              </div>
              <Support show={this.state.showSupportModal} onClose={this.closeSupportModal} subject={this.state.subject} />
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default FAQ;
