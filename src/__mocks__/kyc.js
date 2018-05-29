export default {
  id_document_status: 'UNDEFINED',
  util_document_status: 'UNDEFINED',
  selfie_document_status: 'UNDEFINED',
  whitelist_selfie_document_status: 'UNDEFINED',
  is_verified: false,
  residence_document_status: 'UNDEFINED',
  user_visible_comment: null,
  out_of_limit: false,
  limits_message: {
    trade_limits: [
      {
        message: '0.00 USD out of allowed 1000.00 USD per 1 day',
        out_of_limit: false,
        days: 1,
        amount: 1000.0,
        currency: 'USD',
        total_amount: 0.0,
      },
      {
        message: '765.00 USD out of allowed 1000.00 USD per 30 days',
        out_of_limit: false,
        days: 30,
        amount: 1000.0,
        currency: 'USD',
        total_amount: 765.0,
      },
    ],
    tier: {
      name: 'Tier 1',
      upgrade_note: 'Contact Support',
      upgrade_documents: ['selfie'],
    },
    whitelisted_addresses: [],
    whitelisted_addresses_info: {},
  },
};
