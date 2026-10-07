import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { SMART_SEARCH_FIELDS } from "./constants";
import { deleteSmartSearchItemStep } from "./steps/delete-smart-search-item";
import { retrieveCustomerSmartSearchStep } from "./steps/retrieve-customer-smart-search";
import { validateItemInSmartSearchStep } from "./steps/validate-item-in-smart-search";

type DeleteSmartSearchItemWorkflowInput = {
  smart_search_id: string;
  search_item_id: string;
  customer_id: string;
};

export const deleteSmartSearchItemWorkflow = createWorkflow(
  "delete-smart-search-item",
  function (input: DeleteSmartSearchItemWorkflowInput) {
    const smartSearch = retrieveCustomerSmartSearchStep({
      smart_search_id: input.smart_search_id,
      customer_id: input.customer_id,
    });

    validateItemInSmartSearchStep({
      smart_search: smartSearch,
      search_item_id: input.search_item_id,
    });

    deleteSmartSearchItemStep({
      search_item_id: input.search_item_id,
    });

    const { data: smartSearches } = useQueryGraphStep({
      entity: "smart_searches",
      fields: SMART_SEARCH_FIELDS,
      filters: {
        id: smartSearch.id,
      },
    }).config({ name: "refetch-smart-search-after-delete" });

    return new WorkflowResponse({
      smartSearch: smartSearches[0],
    });
  },
);
