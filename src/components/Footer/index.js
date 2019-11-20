import React, { useMemo } from 'react';
import { I18n } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import styled from '@emotion/styled'
import moment from 'moment'

const Footer = (props) => {
  const { location } = props
  const { pathname } = location
  const hideFooter = useMemo(() => (
    pathname === '/signin'
    || pathname === '/signup'
    || pathname === '/not-found'
  ), [location])

  if (hideFooter) return null

  return (
    <I18n ns="translations">
      {(t) => (
        <StyledFooter>
          <section className='logo col-lg-3'>
            <img src="/img/logo.svg" alt="N.exchange Logo" />
          </section>
          <section className='links col-lg-9'>
            <main className=''>
              <section>
                <h4>{t('header.resources')}</h4>
                <ul>
                  <li><Link to='/instant-white-label'>{t('header.whitelabel')}</Link></li>
                  <li><a href='https://nexchange2.docs.apiary.io/'>{t('header.apidocumentation')}</a></li>
                  <li><a href='/#support'>{t('header.support')}</a></li>
                </ul>
              </section>
              <section>
                <h4>{t('header.about')}</h4>
                <ul>
                  <li><a href='/#about'>{t('header.about')}</a></li>
                  <li><Link to='/faqs'>{t('header.faq')}</Link></li>
                  <li><span /></li>
                </ul>
              </section>
              <section>
                <h4>{t('header.social')}</h4>
                <ul>
                  <li><a href='/twitter' target='_blank' rel='noopener noreferrer'>{t('header.twitter')}</a></li>
                  <li><a href='/fb' target='_blank' rel='noopener noreferrer'>{t('header.facebook')}</a></li>
                  <li><a href='/slack' target='_blank' rel='noopener noreferrer'>{t('header.slack')}</a></li>
                  <li><a href='/telegram' target='_blank' rel='noopener noreferrer'>{t('header.telegram')}</a></li>
                </ul>
              </section>


            </main>
            <aside>
              <ul>
                <li>
                  <Link to='/terms-and-conditions'>{t('header.terms-and-conditions')}</Link>
                </li>
                <li>
                  <Link to='/privacy'>{t('header.privacy-policy')}</Link>
                </li>
              </ul>
              
              {/* <Trans i18nKey="footer.3"> */}
                <p>
                  All rights reserved, YOA LTD 2016-{moment(Date.now()).format('YYYY')}<br />England & Wales{' '}
                  <a href="https://beta.companieshouse.gov.uk/company/10009845" rel="noopener noreferrer" target="_blank">
                    registered company No. 10009845
                  </a>
                </p>
              {/* </Trans> */}
            </aside>
          </section>
        </StyledFooter>
      )}
    </I18n>
  )
}

const StyledFooter = styled.footer`
  > section {
    padding: 24px 12px;
    &.logo {
      @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > img {
        margin: 0 2rem;
        width: 180px;
      }
    }
    h4 {
      text-transform: uppercase;
      font-weight: bold;
    }
    ul {
      > li {
        display: block;
        > a {
          text-transform: none;
          padding: 0;
        }
        > span {
          display: block;
          height: 2rem;
        }
      }
    }

    &.links {
      display: flex;
      flex-direction: column;
      > main {
        display: flex;
        @media screen and (max-width: 640px) {
          flex-direction: column;
        }
        > section {
          width: 180px;
          padding: 0 2rem;
          @media screen and (max-width: 640px) {
            width: 100%;
            &:not(:last-child) {
              margin-bottom: 2rem;
            }
          }
        }
      }
      > aside {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        flex-direction: column;
        margin: 4rem 0;
        > p {
          margin: 2rem 0 0;
          font-size: 1rem;
          text-align: center;
        }
        > ul {
          display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
          > li {
            padding: 0;
            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
`

export default withRouter(Footer);
