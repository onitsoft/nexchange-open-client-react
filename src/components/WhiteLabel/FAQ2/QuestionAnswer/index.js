import React, { Component } from 'react';
import { translate } from 'react-i18next';

import styles from './QuestionAnswer.scss';

class QuestionAnswer extends Component {
  constructor(props){
    super(props)

    this.state = { open: false, positiveFeedback: false, negativeFeedback: false };
    
    this.setPositiveFeedback = this.setPositiveFeedback.bind(this);
    this.setNegativeFeedback = this.setNegativeFeedback.bind(this);
  }

  componentDidMount() {
    const browserPath = window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2].toLowerCase().trim() : null;
    /* eslint max-len: ["error", { "code": 200 }] */ 
    const questionPath = this.props.t(`faq.${this.props.id}`).replace(/ /g, '-').replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase().trim();
    if(browserPath === questionPath || decodeURIComponent(browserPath).toLowerCase() === questionPath) {
      this.setState({open: true});
      this.shouldScrollToElement = true;
    }
  }

  componentDidUpdate() {
    if(this.shouldScrollToElement && !this.scrolledToElement) {
        this.scrolledToElement = true;
        document.getElementById(`faq.${this.props.id}`).scrollIntoView();;
    }
  }

  onClick = () => {
    this.setState({ open: !this.state.open });
    window.gtag('event', 'Question open', {event_category: 'FAQ', event_label: `${this.props.t(`faq.${this.props.id}`)}`});
  };

  setPositiveFeedback = () => {
    if(!this.state.positiveFeedback) {
      window.gtag('event', 'Positive Feedback', {event_category: 'FAQ', event_label: `${this.props.t(`faq.${this.props.id}`)}`});
      this.setState({positiveFeedback: true, negativeFeedback: false});
    }
  }
  
  setNegativeFeedback = () => {
    if(!this.state.negativeFeedback) {
      window.gtag('event', 'Negative Feedback', {event_category: 'FAQ', event_label: `${this.props.t(`faq.${this.props.id}`)}`});
      this.setState({positiveFeedback: false, negativeFeedback: true});
      this.props.openSupportModal(this.props.t(`faq.${this.props.id}`));
    }
  }

  render() {
    return (
      <div className={`question-answer ${styles.container}`} id={`faq.${this.props.id}`}>
        <div className={`${styles.question}`} onClick={this.onClick} data-test="question-opener">
          <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square fa-2x`} aria-hidden="true" />
          <h3>
            {this.props.t(`faq.${this.props.id}`)}
          </h3>
        </div>
        <div className={`${this.state.open ? `${styles.answer} ${styles.active}` : `${styles.answer}`}`}>
          {this.props.answer}
          <div className={styles.feedback}>
            <div>
              <span>Whas this helpful?</span>
            </div>
            <div className={styles.buttons}>
              <button className={`btn ${styles.positive} ${this.state.positiveFeedback ? styles.active : ''}`}
              onClick={() => {this.setPositiveFeedback()}}>
                <i className="fas fa-thumbs-up"></i><span>YES</span>
              </button>
              <button className={`btn ${styles.negative} ${this.state.negativeFeedback ? styles.active : ''}`}
              onClick={() => {this.setNegativeFeedback()}}>
                <i className="fas fa-thumbs-down"></i><span>NO</span>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default translate()(QuestionAnswer);
