import React, { Component } from 'react';
import Bookmark from '../Bookmark';

class OrderTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBookmarkModal: false,
    };
  }

  render() {
    return (
      <div className="row">
        <div id="order-header" className="col-xs-12">
          <h3 id="order-ref">
            Order Reference: <b>{this.props.order.unique_reference}</b>
          </h3>

          <button
            id="bookmark-button"
            type="button"
            className="btn btn-default btn-simple"
            onClick={() => this.setState({ showBookmarkModal: true })}
          >
            BOOKMARK
          </button>
        </div>

        <Bookmark
          show={this.state.showBookmarkModal}
          onClose={() => this.setState({ showBookmarkModal: false })}
        />
      </div>
    );
  }
}

export default OrderTop;
