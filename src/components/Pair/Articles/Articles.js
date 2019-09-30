import React from 'react';
import { useParams } from "react-router-dom";
import styles from './Articles.scss';
import { I18n } from 'react-i18next';

function Articles() {
  let { pairRef } = useParams();
  return (
    <I18n ns="translations">
      {t => (
        <div id="about" className={styles.articles}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div>
                  <h2 className="title">{t(`H2 header ${pairRef}`)}</h2>
                  <p>
                    It is a text block with headers and paragraphs, here will be estimate 500 words of text
                </p>
                </div>
                <div>
                  <h2 className="title">{t('H2 header')}</h2>
                  <p>
                    It is a text block with headers and paragraphs, here will be estimate 500 words of text
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18n>
  )
};

export default Articles;
