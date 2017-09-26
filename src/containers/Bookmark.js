import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

import config from '../config';

class ReferralTerms extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false
    }
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

triggerCopyTooltip() {
		$('#copy-to-clipboard').tooltip({
			trigger: 'click',
			placement: 'top'
		});

		$('#copy-to-clipboard').tooltip('hide')
			.attr('data-original-title', 'Copied!')
			.tooltip('show');

		setTimeout(() => {
			$('#copy-to-clipboard').tooltip('destroy');
		}, 1000);
	}

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.onClose} >
        <div id="referral-terms" className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
          </div>

          <div className="modal-body">
            <h3>Bookmark</h3>
            <p>To bookmark this page press CMD+D, or you can copy the link from below. You can always come back to this link later to check your status.</p>


<input type="text" value={`${config.DOMAIN}/order/${this.props.orderRef}`} className="bookmark-input" disabled/>
			        <CopyToClipboard text={`${config.DOMAIN}/order/${this.props.orderRef}`}>
						<button type="button" className="btn btn-themed">Copy</button>
    				</CopyToClipboard>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-simple" data-dismiss="modal" onClick={this.props.onClose} >Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ReferralTerms;
