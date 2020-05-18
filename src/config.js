const development = process.env.NODE_ENV !== 'production';

const config = {
  NAME: 'N.exchange',
  DOMAIN: 'https://n.exchange',
  API_BASE_URL: 'https://api.n.exchange/en/api/v1',
  //   API_BASE_URL: 'http://localhost:8000/en/api/v1',
  SUPPORT_EMAIL: 'support@n.exchange',
  PRICE_FETCH_INTERVAL: 60000,
  ORDER_BOOK_FETCH_INTERVAL: 10000,
  ORDER_DETAILS_FETCH_INTERVAL: 20000,
  RECENT_ORDERS_INTERVAL: 20000,
  RECENT_ORDERS_COUNT: 5,
  PRICE_COMPARISON_INTERVAL: 60000,
  REFERRAL_CODE: null,
  KYC_DETAILS_FETCH_INTERVAL: 20000,
  ADVANCED_MODE_ENABLED: true,
  GRAPHCMS_API: 'https://api-euwest.graphcms.com/v1/ck2olkts50bo501i0h3ej7d1f/master',
  INTERCOM_APP_ID: 'a3zrft9d',
  AUTH_CLIENT_ID: development ? '1rftGOrlUDgZEGKFSg9yIbizOTM26N4QuOQHfBME' : '0JKglYaNEiGxTuAAFMYbXL4m7P6Qk4eWU62LhvMv',
  AUTH_CLIENT_SECRET: development
    ? 'hpS5mRTDN8EWRgTFlDetU6mlMJw5VintTSPazuP0MUil4KyvEQnNAZHN79PObFtjTR8lL9XwTWxboXiMA19f6s4AeWNuZK7X2d1B2icmRj9q1ol5m0Qpp8RAJHVBvSji'
    : '5cNFTdJGtR0qwRYevWOMFjNIepkl6TMieZP6wdqOOIVplL0YWB8Lw5WvizU6CHiIBn21JnUd0Twc1W52MyzFRsGrV8AixFcZJpnHY3fzgiaYv9AyXS1zDbNP0xUqAxgp',
};

export default config;
