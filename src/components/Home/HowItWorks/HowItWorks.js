import React from 'react';
import { I18n } from 'react-i18next';

import styles from './HowItWorks.scss';

const HowItWorks = () => {
  return <I18n ns="translations">{t => <div className="container hidden-sm  hidden-xs" />}</I18n>;
};

export default HowItWorks;
