import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteSmartSearchStep } from "./steps/delete-smart-search";
import { retrieveCustomerSmartSearchStep } from "./steps/retrieve-customer-smart-search";

type DeleteSmartSearchWorkflowInput = {
  smart_search_id: string;
  customer_id: string;
};

export const deleteSmartSearchWorkflow = createWorkflow(
  "delete-smart-search",
  function (input: DeleteSmartSearchWorkflowInput) {
    const smartSearch = retrieveCustomerSmartSearchStep({
      smart_search_id: input.smart_search_id,
      customer_id: input.customer_id,
    });

    deleteSmartSearchStep({ id: smartSearch.id });

    return new WorkflowResponse({ id: smartSearch.id });
  },
);
