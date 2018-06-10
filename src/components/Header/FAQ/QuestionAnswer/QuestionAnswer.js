import React, { Component } from 'react';
import { I18n } from 'react-i18next';

class QuestionAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
	<I18n ns="translations">
	 {(t) => (
      <div className="question-answer">
        <h3 onClick={this.onClick}>
          {t(`faq.${this.props.id}`)}{' '} 
		  <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square`} aria-hidden="true" />
        </h3>
        <div className={this.state.open ? 'answer active' : 'answer'}>{this.props.answer}</div>
        <hr />
      </div>
	 )}
	</I18n>
    );
  }
}

export default QuestionAnswer;
