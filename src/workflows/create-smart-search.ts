import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { SMART_SEARCH_FIELDS } from "./constants";
import { createSmartSearchStep } from "./steps/create-smart-search";
import { validateCustomerCreateSmartSearchStep } from "./steps/validate-customer-create-smart-search";

type CreateSmartSearchWorkflowInput = {
  customer_id: string;
  sales_channel_id: string;
  search_type: string;
};

export const createSmartSearchWorkflow = createWorkflow(
  "create-smart-search",
  function (input: CreateSmartSearchWorkflowInput) {
    validateCustomerCreateSmartSearchStep({
      customer_id: input.customer_id,
      search_type: input.search_type,
    });

    const created = createSmartSearchStep({
      customer_id: input.customer_id,
      sales_channel_id: input.sales_channel_id,
      search_type: input.search_type,
    });

    const { data: smartSearches } = useQueryGraphStep({
      entity: "smart_searches",
      fields: SMART_SEARCH_FIELDS,
      filters: {
        id: created.id,
      },
    }).config({ name: "refetch-smart-search" });

    return new WorkflowResponse({
      smartSearch: smartSearches[0],
    });
  },
);
