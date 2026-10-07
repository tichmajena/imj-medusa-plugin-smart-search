import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { SMART_SEARCH_FIELDS } from "./constants";
import { createSmartSearchItemStep } from "./steps/create-smart-search-item";
import { retrieveCustomerSmartSearchStep } from "./steps/retrieve-customer-smart-search";
import { validateSearchItemStep } from "./steps/validate-search-item";

type CreateSmartSearchItemWorkflowInput = {
  smart_search_id: string;
  customer_id: string;
  title: string;
  content: string;
};

export const createSmartSearchItemWorkflow = createWorkflow(
  "create-smart-search-item",
  function (input: CreateSmartSearchItemWorkflowInput) {
    const smartSearch = retrieveCustomerSmartSearchStep({
      smart_search_id: input.smart_search_id,
      customer_id: input.customer_id,
    });

    validateSearchItemStep({
      title: input.title,
      content: input.content,
      smart_search: smartSearch,
    });

    createSmartSearchItemStep({
      search_id: smartSearch.id,
      title: input.title,
      content: input.content,
    });

    const { data: smartSearches } = useQueryGraphStep({
      entity: "smart_searches",
      fields: SMART_SEARCH_FIELDS,
      filters: {
        id: smartSearch.id,
      },
    }).config({ name: "refetch-smart-search" });

    return new WorkflowResponse({
      smartSearch: smartSearches[0],
    });
  },
);
