import React, { Component } from 'react';
import Bookmark from './Bookmark/Bookmark';
import styles from './OrderTop.scss';

class OrderTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBookmarkModal: false,
    };
  }

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <h3 className={styles.ref}>
            Order Reference: <b>{this.props.order.unique_reference}</b>
          </h3>

          <button
            type="button"
            className={`${styles.bookmark} btn btn-default btn-simple`}
            onClick={() => this.setState({ showBookmarkModal: true })}
          >
            BOOKMARK
          </button>
        </div>

        <Bookmark show={this.state.showBookmarkModal} onClose={() => this.setState({ showBookmarkModal: false })} />
      </div>
    );
  }
}

export default OrderTop;
