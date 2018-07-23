import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import styles from './LanguagePicker.scss';

class LanguagePicker extends Component {
  supportedLanguages = ['de', 'en'];

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  sortedSupportedLanguages() {
    const selectedLanguage = I18n.language || window.localStorage.i18nextLng;
    const selectedLngPosition = this.supportedLanguages.indexOf(selectedLanguage);

    return this.array_move(this.supportedLanguages, selectedLngPosition, 0);
  }

  render = () => {
    const languages = this.sortedSupportedLanguages();

    return (
      <ul className={styles.languagepicker}>
        {languages.map(lng => (
          <I18n ns="translations">
            {(t, { i18n }) => (
              <li>
                <a href={`#${lng}`} className="selected" onClick={() => i18n.changeLanguage(`${lng}`)}>
                  <img className="flag" src={`/img/flags/${lng.toUpperCase()}.svg`} alt={t(`header.${lng}`)} />
                  <span className="visible-xs-inline visible-ms-inline visible-lg-inline">{t(`header.${lng}`)}</span>
                </a>
              </li>
            )}
          </I18n>
        ))}
      </ul>
    );
  };
}

export default LanguagePicker;
