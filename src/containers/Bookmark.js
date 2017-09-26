import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import platform from 'platform';
import CopyToClipboard from 'react-copy-to-clipboard';


class Bookmark extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false
    }
  }

  triggerCopyTooltip() {
    $('#bookmark .fa-clipboard').tooltip({
      trigger: 'click',
      placement: 'top'
    });

    $('#bookmark .fa-clipboard').tooltip('hide')
      .attr('data-original-title', 'Copied!')
      .tooltip('show');

    setTimeout(() => {
      $('#bookmark .fa-clipboard').tooltip('destroy');
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.show != this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.onClose} >
        <div id="bookmark" className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
              <i className="material-icons">clear</i>
            </button>
            <h4 className="modal-title " data-toggle="tooltip" data-placement="top" data-original-title="Copy">Bookmark Order</h4>
          </div>

          <div className="modal-body">
            <p className="bookmark-text">Press <b>{platform.os.family == 'OS X' ? 'Command (⌘)' : 'Ctrl'} + D</b> to add this page to your bookmarks. You can navigate back to this page at any time to check the status of your order.</p>

            <div className="input-group">
              <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons" value={window.location.href} disabled /><span className="material-input"></span></div>

              <CopyToClipboard text={window.location.href} onCopy={() => this.triggerCopyTooltip()}>
                <span className="input-group-addon">
                  <i className="fa fa-clipboard" aria-hidden="true"></i>
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Bookmark;
