import React, { Component, Fragment } from 'react';
import { I18n } from 'react-i18next';
import Fuse from 'fuse.js';
import debounce from 'Utils/debounce';
import i18n from 'Src/i18n';

import QuestionAnswer from './QuestionAnswer';
import Support from 'Components/Header/Support/Support';
import styles from './FAQ.scss';
import { markdown } from 'markdown'

const FAQ_COUNT = 14;

class FAQ extends Component {
  showSearch = true
  questionsRoot = 'whitelabel.faq.questions'
  answerRoot = 'whitelabel.faq.answers'
  constructor(props) {
    super(props)

    this.faqs = [];
    this.state = {
      loading: true,
      searchText: '',
      filteredQuestionsIds: Array(FAQ_COUNT).fill().map((e,i)=>i+1),
      showSupportModal: false,
      subject: ''
    }
  }
  
  UNSAFE_componentWillMount() {
    window.gtag('event', 'WhiteLabel FAQs open', {event_category: 'WhiteLabelFAQ', event_label: ``});
  }

  showQuestion(id) {
    return this.state.filteredQuestionsIds.indexOf(id) !== -1;
  }

  closeSupportModal = () => this.setState({ showSupportModal: false });
  openSupportModal = (subject) => {
    this.setState({ showSupportModal: true, subject });
  }
  
  componentDidUpdate() {
    if (this.state.loading) {
      //Populate local FAQ Array
      const faqIdArray = Array(FAQ_COUNT).fill().map((e,i)=>i+1);
      let faqs = [];
      faqIdArray.forEach((id) => {
        let faq =  {
          id,
          question: i18n.t(`whitelabelfaq.ques${id}`),
          answer: i18n.t(`whitelabelfaq.ans${id}`)
        }
        faqs.push(faq);
      });
      this.faqs = faqs;

      //Show modal
      this.setState({
        loading: false,
      });
    }
  }

  handleChange(event){
    const searchText = event.target.value;

    if(_.isEmpty(searchText.trim())){
      this.setState({
        searchText: '',
        filteredQuestionsIds: Array(FAQ_COUNT).fill().map((e,i)=>i+1)
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
    if(_.isEmpty(searchResult)){
      window.gtag('event', 'WhiteLabel FAQ not found', {event_category: 'WhiteLabelFAQ', event_label: `${searchText}`});
    }

    const filteredQuestionsIds = _.sortBy(_.map(searchResult, 'id'));


    this.setState({
      searchText,
      filteredQuestionsIds
    });
  }

  trackEvent = debounce(faqSearched => {
    window.gtag('event', 'WhiteLabel FAQ searched', {event_category: 'WhiteLabelFAQ', event_label: `${faqSearched}`});
  }, 100);

  questions = [
    'what-is-whitelabel',
    'why-whitelabel'
  ]

  makeSEOQNA = (questions, t) => {
    const seoqna = {

      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        ...questions.map((q) => ({
          "@type": "Question",
          "name": t(`whitelabel.faq.questions.${q}`),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": markdown.toHTML(t(`whitelabel.faq.answers.${q}`))
          }
        }))
      ]
    }

    return seoqna
  }

  render() {


    return (
      <I18n ns="translations">
        {t => (
          <Fragment>
            <div className="col-xs-12">
              <div className={styles.brand}>
                <h1>{t('faq.heading1')}</h1>
                <h2>{t('faq.heading2')}</h2>
              </div>
            </div>   
            <div className={`col-xs-12 ${styles.faqs}`}>
              {this.showSearch && (
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <div className={`${styles.input}`}>
                    <i className={`fas fa-search`}></i>
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
              )}
              
              {_.isEmpty(this.state.filteredQuestionsIds) 
              ? <div className={styles.notfound}><h3>{t('whitelabel.faq.notfound')}</h3>
                  <a onClick={() => this.openSupportModal(this.state.searchText)}>{t('whitelabel.faq.openticket')}</a>
                </div>
              : <div id='faq.list' className={styles.list}>
                {this.props.items && this.props.items.map((item, index) => this.showQuestion(index + 1) && (
                  <QuestionAnswer
                    key={`wqa-${index}`}
                    openSupportModal={this.openSupportModal}
                    {...item}
                  />
                ))}
              </div>
              }
              </div>
              <Support show={this.state.showSupportModal} onClose={this.closeSupportModal} subject={this.state.subject} />
              <script type="application/ld+json">{JSON.stringify(this.makeSEOQNA(this.questions, t))}</script>
            </Fragment>
        )}
      </I18n>
    );
  }
}

export default FAQ;
