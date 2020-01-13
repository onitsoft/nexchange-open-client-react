import React, { Component } from 'react';
import { I18n } from 'react-i18next';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enablePayment: false,
    }
  }

  render(){
    const props = this.props;
    
    return (
        <div>
            <I18n ns="translations">
            {(t) => (
            <label>
              {/* eslint max-len: ["error", { "code": 200 }] */}
              <input type="checkbox" name={props.name} id={props.name} value="check" style={{ width: '20px', height: '20px', cursor: 'pointer'}}
              onClick={function togglePayNowButton() {
                  let _checkoutButton = document.getElementsByName("checkoutButton")[0];
                  let _box = document.getElementsByName('checkboxTC')[0];
                  let _box_kyc = document.getElementsByName("checkboxKYC")[0];
                  if (_box.checked && _box_kyc.checked) {
                      this.setState({enablePayment: true});
                      _checkoutButton.classList.remove("disabled");
                  } else {
                      this.setState({enablePayment: false});
                      _checkoutButton.classList.add("disabled");
                  }
              }.bind(this)}/>
              <strong style={{paddingLeft: "7px", cursor: 'pointer'}} dangerouslySetInnerHTML={{__html: t(props.order)}}/>
            </label>
            )}
            </I18n>
            
        </div> 
       );
    }
};


export default Checkbox;
