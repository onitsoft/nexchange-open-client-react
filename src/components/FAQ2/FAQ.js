import React, { Component } from 'react';
import { I18n, Trans } from 'react-i18next';
import Fuse from 'fuse.js';
import debounce from 'Utils/debounce';
import i18n from 'Src/i18n';

import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import Support from '../Header/Support/Support';
import styles from './FAQ.scss';

import VideoCard from 'Components/WhiteLabel/VideoCard/VideoCard'
import KeyFeatures from 'Components/WhiteLabel/KeyFeatures/KeyFeatures'
import MajorCard from 'Components/WhiteLabel/MajorCard/MajorCard'
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/SupportedAssets' 
import MinorCard from 'Components/WhiteLabel/MinorCard/MinorCard'
import WhiteLabelFAQ from 'Components/WhiteLabel/WhiteLabelFAQ/WhiteLabelFAQ'


const FAQ_COUNT = 14;

class FAQ extends Component {
  constructor(props) {
    super(props)

    this.faqs = [];
    this.state = {
      loading: true,
      searchText: '',
      filteredQuestionsIds: Array(FAQ_COUNT).fill().map((e, i) => i + 1),
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
  openSupportModal = (subject) => {
    this.setState({ showSupportModal: true, subject });
  }

  componentDidUpdate() {
    if (this.state.loading) {
      //Populate local FAQ Array
      const faqIdArray = Array(FAQ_COUNT).fill().map((e, i) => i + 1);
      let faqs = [];
      faqIdArray.forEach((id) => {
        let faq = {
          id,
          question: i18n.t(`faq.ques${id}`),
          answer: i18n.t(`faq.ans${id}`)
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

  handleChange(event) {
    const searchText = event.target.value;

    if (_.isEmpty(searchText.trim())) {
      this.setState({
        searchText: '',
        filteredQuestionsIds: Array(FAQ_COUNT).fill().map((e, i) => i + 1)
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
      filteredQuestionsIds
    });
  }

  trackEvent = debounce(faqSearched => {
    window.gtag('event', 'FAQ searched', { event_category: 'FAQ', event_label: `${faqSearched}` });
  }, 100);

  render() {
    return (
      <>
        <VideoCard />
        <KeyFeatures />
        <MajorCard />
        <SupportedAssets />
        <MinorCard />
        <MinorCard />
        <MinorCard />
        <WhiteLabelFAQ />
      </>
    )
  }
}

export default FAQ;
