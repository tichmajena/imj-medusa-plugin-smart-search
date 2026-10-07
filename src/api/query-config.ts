export const smartSearchQueryConfig = {
  defaults: [
    "id",
    "customer_id",
    "sales_channel_id",
    "search_type",
    "created_at",
    "updated_at",
    "items.*",
  ],
};

export const listSmartSearchesQueryConfig = {
  ...smartSearchQueryConfig,
  isList: true,
};

export const retrieveSmartSearchQueryConfig = {
  ...smartSearchQueryConfig,
  isList: false,
};
