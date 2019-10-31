import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './LanguagePicker.scss';

class LanguagePicker extends Component {
  supportedLanguages = ['en', 'de', 'ru'];

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  sortedSupportedLanguages() {
    const selectedLanguage = I18n.language || window.localStorage.i18nextLng;
    let selectedLngPosition = this.supportedLanguages.indexOf(selectedLanguage);
    if(selectedLngPosition < 0) {
      selectedLngPosition = 0;
    }

    return this.array_move(this.supportedLanguages, selectedLngPosition, 0);
  }

  render = () => {
    const languages = this.sortedSupportedLanguages();
    return (
      <ul className={styles.languagepicker}>
        {languages.map(lng => (
          <I18n ns="translations" key={lng}>
            {(t, { i18n }) => (
              <li key={lng}>
               <Link to={`?lang=${lng.toLowerCase()}`} onClick={() => i18n.changeLanguage(`${lng}`)}  replace={false}>
                <span className="selected">
                  <img className="flag" src={`/img/flags/${lng.toUpperCase()}.svg`} alt={t(`header.${lng}`)} />
                  <span className="visible-xs-inline visible-ms-inline visible-lg-inline">{t(`header.${lng}`)}</span>
                </span>
              </Link>
              </li>
            )}
          </I18n>
        ))}
      </ul>
    );
  };
}

export default LanguagePicker;
