import React, { Component } from 'react';

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
          {this.props.question} <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square`} aria-hidden="true" />
        </h3>
        <div className={this.state.open ? 'answer active' : 'answer'}>{this.props.answer}</div>
        <hr />
      </div>
    );
  }
}

export default QuestionAnswer;
