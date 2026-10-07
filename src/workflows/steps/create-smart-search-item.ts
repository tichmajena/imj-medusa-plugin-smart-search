import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SMART_SEARCH_MODULE } from "../../modules/smart-search";
import SmartSearchModuleService from "../../modules/smart-search/service";

type CreateSmartSearchItemStepInput = {
  search_id: string;
  title: string;
  content: string;
};

export const createSmartSearchItemStep = createStep(
  "create-smart-search-item-step",
  async (input: CreateSmartSearchItemStepInput, { container }) => {
    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    const item = await smartSearchModuleService.createSmartSearchItems(input);

    return new StepResponse(item, item.id);
  },
  async (id, { container }) => {
    if (!id) {
      return;
    }

    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.deleteSmartSearchItems(id);
  },
);
