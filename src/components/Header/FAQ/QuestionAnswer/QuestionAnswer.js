import React, { Component } from 'react';

class QuestionAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    window.ga('send', 'event', 'FAQ', 'question open');
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="question-answer">
        <h3 onClick={this.onClick}>
          {this.props.question} <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square`} aria-hidden="true" />
        </h3>
        <div className={this.state.open ? 'answer active' : 'answer'}>{this.props.answer}</div>
        <hr />
      </div>
    );
  }
}

export default QuestionAnswer;
