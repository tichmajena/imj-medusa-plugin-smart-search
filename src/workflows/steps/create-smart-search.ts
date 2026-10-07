import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SMART_SEARCH_MODULE } from "../../modules/smart-search";
import SmartSearchModuleService from "../../modules/smart-search/service";

type CreateSmartSearchStepInput = {
  customer_id: string;
  sales_channel_id: string;
  search_type: string;
};

export const createSmartSearchStep = createStep(
  "create-smart-search-step",
  async (input: CreateSmartSearchStepInput, { container }) => {
    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    const smartSearch =
      await smartSearchModuleService.createSmartSearches(input);

    return new StepResponse(smartSearch, smartSearch.id);
  },
  async (id, { container }) => {
    if (!id) {
      return;
    }

    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.deleteSmartSearches(id);
  },
);
