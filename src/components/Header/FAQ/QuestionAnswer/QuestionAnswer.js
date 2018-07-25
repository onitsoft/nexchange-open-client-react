import React, { Component } from 'react';
import { translate } from 'react-i18next';

class QuestionAnswer extends Component {
  state = { open: false };

  onClick = () => {
    this.setState({ open: !this.state.open });
    window.ga('send', 'event', 'FAQ', 'question open');
  };

  render() {
    return (
      <div className="question-answer">
        <h3 onClick={this.onClick} data-test="question-opener">
          {this.props.t(`faq.${this.props.id}`)} <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square`} aria-hidden="true" />
        </h3>
        <div className={this.state.open ? 'answer active' : 'answer'}>{this.props.answer}</div>
        <hr />
      </div>
    );
  }
}

export default translate()(QuestionAnswer);
