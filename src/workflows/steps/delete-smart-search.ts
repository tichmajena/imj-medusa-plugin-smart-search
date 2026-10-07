import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SMART_SEARCH_MODULE } from "../../modules/smart-search";
import SmartSearchModuleService from "../../modules/smart-search/service";

type DeleteSmartSearchStepInput = {
  id: string;
};

export const deleteSmartSearchStep = createStep(
  "delete-smart-search-step",
  async ({ id }: DeleteSmartSearchStepInput, { container }) => {
    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.softDeleteSmartSearches(id);

    return new StepResponse(void 0, id);
  },
  async (id, { container }) => {
    if (!id) {
      return;
    }

    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.restoreSmartSearches([id]);
  },
);
