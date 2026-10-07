import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { SMART_SEARCH_FIELDS } from "./constants";
import { retrieveCustomerSmartSearchStep } from "./steps/retrieve-customer-smart-search";
import { updateSmartSearchItemStep } from "./steps/update-smart-search-item";
import { validateItemInSmartSearchStep } from "./steps/validate-item-in-smart-search";
import { validateSearchItemStep } from "./steps/validate-search-item";

type UpdateSmartSearchItemWorkflowInput = {
  smart_search_id: string;
  search_item_id: string;
  customer_id: string;
  title?: string;
  content?: string;
};

export const updateSmartSearchItemWorkflow = createWorkflow(
  "update-smart-search-item",
  function (input: UpdateSmartSearchItemWorkflowInput) {
    const smartSearch = retrieveCustomerSmartSearchStep({
      smart_search_id: input.smart_search_id,
      customer_id: input.customer_id,
    });

    const existingItem = validateItemInSmartSearchStep({
      smart_search: smartSearch,
      search_item_id: input.search_item_id,
    });

    const nextItemValues = transform(
      { existingItem, input, smartSearch },
      ({ existingItem, input, smartSearch }) => ({
        title: input.title ?? existingItem.title,
        content: input.content ?? existingItem.content,
        current_search_item_id: existingItem.id,
        smart_search: smartSearch,
      }),
    );

    validateSearchItemStep(nextItemValues);

    updateSmartSearchItemStep({
      id: existingItem.id,
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
