import React, { Component } from 'react';
import { I18n } from 'react-i18next';

class LanguagePicker extends Component {
  constructor(props) {
    super(props);
      
    this.supportedLanguages = ["de","en"]  
  }
    
  array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
  };
    

  sortedSupportedLanguages() {
    let selectedLanguage = I18n.language || window.localStorage.i18nextLng;
    let selectedLngPosition = this.supportedLanguages.indexOf(selectedLanguage)
    return this.array_move(this.supportedLanguages, selectedLngPosition, 0)
  }

  showLanguageSelection(isLargeScreenType) {
    let classNames = (isLargeScreenType)? "visible-sm visible-md visible-lg" : "visible-xs";
    return (
        <li className={classNames}>
            {this.renderLanguageSelections()}
        </li>
    );
  }
  
  renderLanguageSelections = () => {
    let languages = this.sortedSupportedLanguages();
    return (
       <ul className="languagepicker">
        {languages.map(lng => (
          <I18n ns="translations">
              {(t, { i18n }) => (
                  <li>
                      <a href={`#${lng}`} className="selected" onClick={() => i18n.changeLanguage(`${lng}`)}>
                          <img className="flag" src={`/img/flags/${lng.toUpperCase()}.svg`} alt={t(`header.${lng}`)} />
                          {t(`header.${lng}`)}
                      </a>
                  </li>
              )}
              </I18n> 
        ))}
        </ul>
    );
  }
    
  render = () => {
    var isLargeScreenType = false;
    if(this.props.screenType === "large") {
        isLargeScreenType = true;
    } 
      
    return this.showLanguageSelection(isLargeScreenType);
  }
}

export default LanguagePicker;