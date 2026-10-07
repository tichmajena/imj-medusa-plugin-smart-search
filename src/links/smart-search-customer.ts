import { defineLink } from "@medusajs/framework/utils";
import CustomerModule from "@medusajs/medusa/customer";
import SmartSearchModule from "../modules/smart-search";

export default defineLink(
  {
    linkable: SmartSearchModule.linkable.smartSearches.id,
    field: "customer_id",
    isList: true,
  },
  CustomerModule.linkable.customer,
  {
    readOnly: true,
  },
);
