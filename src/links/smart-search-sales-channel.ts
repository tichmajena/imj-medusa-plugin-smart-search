import { defineLink } from "@medusajs/framework/utils";
import SalesChannelModule from "@medusajs/medusa/sales-channel";
import SmartSearchModule from "../modules/smart-search";

export default defineLink(
  {
    linkable: SmartSearchModule.linkable.smartSearches.id,
    field: "sales_channel_id",
  },
  SalesChannelModule.linkable.salesChannel,
  {
    readOnly: true,
  },
);
