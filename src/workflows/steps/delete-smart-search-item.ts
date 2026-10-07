import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SMART_SEARCH_MODULE } from "../../modules/smart-search";
import SmartSearchModuleService from "../../modules/smart-search/service";

type DeleteSmartSearchItemStepInput = {
  search_item_id: string;
};

export const deleteSmartSearchItemStep = createStep(
  "delete-smart-search-item-step",
  async ({ search_item_id }: DeleteSmartSearchItemStepInput, { container }) => {
    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.softDeleteSmartSearchItems(search_item_id);

    return new StepResponse(void 0, search_item_id);
  },
  async (searchItemId, { container }) => {
    if (!searchItemId) {
      return;
    }

    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.restoreSmartSearchItems([searchItemId]);
  },
);
