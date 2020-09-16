import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { I18n } from 'react-i18next';
import Fuse from 'fuse.js';
import { graphql } from 'react-apollo';
import Marked from 'react-markdown';
import _ from 'lodash';

import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import Support from '../Header/Support/Support';
import styles from './FAQ.scss';

import GET_FAQS from './get-faqs.query';

const FAQ = props => {
  const { data } = props;
  const { pages } = data;
  const [support, setSupport] = useState({
    active: false,
    subject: '',
  });
  const setSupportModal = useCallback(active => setSupport(st => ({ ...st, active })), [setSupport]);

  const [items, setItems] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const onSubmit = useCallback(({ preventDefault }) => {
    preventDefault();
  }, []);

  const searchOptions = useMemo(
    () => ({
      keys: ['title', 'content'],
      id: 'id',
    }),
    []
  );

  const fuse = useMemo(() => new Fuse(items, searchOptions), [items, searchOptions]);

  useEffect(() => {
    const faqs = pages?.[0]?.faq;

    if (faqs?.length) {
      if (searchValue) {
        const found = fuse.search(searchValue);
        const newItems = found.map(id => _.find(faqs, { id }));

        setItems(newItems);
      } else setItems(faqs);
    }
  }, [pages, searchValue]);

  const openSupportModal = useCallback(
    subject => {
      setSupport({ active: true, subject });
    },
    [support]
  );

  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.container}>
          <div className="container">
            <div className="col-xs-12">
              <div className={styles.brand}>
                <h1>{t('faq.heading1')}</h1>
                <h2>{t('faq.heading2')}</h2>
              </div>
            </div>
            <div className={`col-xs-12 ${styles.faqs}`}>
              <form className="form-group" onSubmit={onSubmit}>
                <div className={`${styles.input}`}>
                  <i className={`fas fa-search`}></i>
                  <input
                    type="text"
                    className={`form-control`}
                    id="faq-search"
                    value={searchValue}
                    onChange={({ target: { value } }) => setSearchValue(value)}
                    placeholder={t('faq.inputplaceholder')}
                  />
                </div>
              </form>

              <div id="faq.list" className={styles.list}>
                {(!items || !items.length) && (
                  <div className={styles.notfound}>
                    <h3>{t('faq.notfound')}</h3>
                    <a onClick={() => openSupportModal(searchValue)}>{t('faq.openticket')}</a>
                  </div>
                )}
                {items.map((faq, index) => (
                  <QuestionAnswer
                    key={faq.id}
                    id={`faq-${index}`}
                    openSupportModal={openSupportModal}
                    question={faq.title}
                    answer={
                      <Marked
                        source={faq.content}
                        renderers={{
                          link: ({ href, children }) => (
                            <a href={href} rel="noopener noreferrer" target="_blank">
                              {children}
                            </a>
                          ),
                        }}
                      />
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <Support show={support.active} onClose={() => setSupportModal()} subject={support.subject} />
        </div>
      )}
    </I18n>
  );
};

export default graphql(GET_FAQS, {
  options: () => ({ variables: { pagename: 'faqs' } }),
})(FAQ);
