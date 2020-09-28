import React from 'react';
import Marked from 'react-markdown';
import styled from '@emotion/styled';
import { HashLink } from 'react-router-hash-link';
import i18n from 'Src/i18n';

import { TagLink } from 'Components/misc/TagLink';

export const TopicsList = ({ items }) => {
  if (!items || !items.length) return <>Loading...</>;
  const lang = i18n.language;

  return items.map((article, index) => (
    <TopicCard
      key={`topic-${index}`}
      title={article.title}
      btn={
        article.link && article.link[0] === '/' ? (
          <HashLink smooth to={`/${lang}/instant-white-label#application`}>
            <TagLink>{article.linkText}</TagLink>
          </HashLink>
        ) : (
          <TagLink href={`${article.link}?ref=whitelabel=page`}>{article.linkText}</TagLink>
        )
      }
      content={article.content}
      art={article.art && article.art.url}
    />
  ));
};

const TopicCard = ({ title, content, art, btn }) => (
  <StyledTopic>
    <div className="art">
      <img src={art} alt={title} />
    </div>
    <section>
      <div>{btn ? btn : null}</div>
      <h3>{title}</h3>
      <Marked source={content} />
    </section>
  </StyledTopic>
);

const StyledTopic = styled.article`
  display: grid;
  grid-column-gap: 10rem;
  grid-row-gap: 3rem;
  grid-template-areas: 'art content';

  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  @media screen and (min-width: 960px) {
    &:nth-of-type(even) {
      grid-template-areas: 'content art';
    }
  }
  &:not(:last-of-type) {
    margin-bottom: 12rem;
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'content' 'art';
  }

  > .art {
    grid-area: art;
    padding: 2rem;
    > img {
    }
  }
  > section {
    grid-area: content;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > h2,
    > h3 {
      font-family: 'Clan Offc Pro Medium', sans-serif;
      font-weight: 300;
      font-size: 22px;
      margin: 2rem 0;
    }
    > p {
      font-family: 'Clan Offc Pro Book', sans-serif;
      font-weight: 400;
      font-size: 14px;
    }

    @media screen and (max-width: 960px) {
      padding: 0 4rem;
    }
  }
`;

export default TopicsList;
