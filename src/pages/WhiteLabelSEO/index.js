import React from 'react';
import styled from '@emotion/styled';

import { graphql } from 'react-apollo';

import VideoCard from 'Components/WhiteLabel/VideoCard/';
import MajorCard from 'Components/WhiteLabel/MajorCard/';
import SupportedAssets from 'Components/WhiteLabel/SupportedAssets/';
import FAQ from 'Components/WhiteLabel/FAQ2/';
import PriceTable from 'Components/WhiteLabel/PriceTable/';
import TopicsList from './topics';
import YouTube from 'react-youtube';
import UpdatedTime from 'Components/updated-time';

import GET_WHITELABEL from './get-whitelabel.query';

const youtubeOptions = {
  width: '100%',
  height: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    mute: 1,
  },
};

const WhiteLabelSEO = ({ data }) => {
  const { pages } = data;
  const { title, videoId, topics, faq, main, createdAt, updatedAt } = (pages && pages[0]) || {};

  return (
    <StyledWhitelabel>
      <VideoCard
        title={title}
        content={
          <YouTube
            id="whitelabel-video"
            videoId={videoId}
            opts={youtubeOptions}
            onPlay={() => {
              window.gtag('event', 'Whitelabel Video', { event_category: 'interaction', event_label: `Video Start` });
            }}
            onEnd={() => {
              window.gtag('event', 'Whitelabel Video', { event_category: 'interaction', event_label: `Video Finished` });
            }}
          />
        }
      />
      <div className="container">
        <section className="row">
          <MajorCard title={main && main.title} content={main && main.content} art={main && main.art && main.art.url} />
        </section>
        <section className="row">
          <SupportedAssets />
        </section>
        <section className="row">
          <TopicsList items={topics} />
        </section>
        <section className="row">
          <PriceTable plans={plans} />
        </section>
        <section className="row">
          <FAQ items={faq} />
        </section>
      </div>

      <UpdatedTime created={createdAt} updated={updatedAt} />
    </StyledWhitelabel>
  );
};

const StyledWhitelabel = styled.main`
  padding: 70px 0 75px 0;
  text-align: center;
  strong {
    font-family: Clan Offc Pro Book;
  }
  > aside {
    margin: 8rem 0;
  }
  > section {
    margin: 12rem 0;
  }
  > .container {
    > .row {
      margin-top: 12rem;
    }
  }
`;

const plans = [
  {
    name: 'community',
    setup: 0,
    monthly: 0,
  },
  {
    name: 'crypto',
    setup: 14500,
    monthly: 250,
    duration: 12,
    devhours: 1,
    hourprice: 200,
    coinlist: 10000,
    chatbot: 295,
    support: true,
  },
  {
    name: 'fiat',
    setup: 19500,
    monthly: 450,
    duration: 12,
    devhours: 2,
    hourprice: 100,
    coinlist: 5000,
    chatbot: 195,
    support: true,
  },
  {
    name: 'ieo',
    setup: 29500,
    monthly: 950,
    duration: 12,
    devhours: 4,
    hourprice: 100,
    coinlist: 0,
    chatbot: 0,
    support: true,
  },
];

export default graphql(GET_WHITELABEL, {
  options: () => ({ variables: { pagename: 'whitelabel' } }),
})(WhiteLabelSEO);
