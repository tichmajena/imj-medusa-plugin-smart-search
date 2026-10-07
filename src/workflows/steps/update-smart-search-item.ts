import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { SMART_SEARCH_MODULE } from "../../modules/smart-search";
import SmartSearchModuleService from "../../modules/smart-search/service";

type UpdateSmartSearchItemStepInput = {
  id: string;
  title?: string;
  content?: string;
};

type PreviousSmartSearchItemState = {
  id: string;
  title: string;
  content: string;
};

export const updateSmartSearchItemStep = createStep(
  "update-smart-search-item-step",
  async (
    { id, title, content }: UpdateSmartSearchItemStepInput,
    { container },
  ) => {
    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    const previous = await smartSearchModuleService.retrieveSmartSearchItem(
      id,
      {
        select: ["id", "title", "content"],
      },
    );

    await smartSearchModuleService.updateSmartSearchItems({
      id,
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
    });

    return new StepResponse(void 0, previous as PreviousSmartSearchItemState);
  },
  async (previous, { container }) => {
    if (!previous) {
      return;
    }

    const smartSearchModuleService: SmartSearchModuleService =
      container.resolve(SMART_SEARCH_MODULE);

    await smartSearchModuleService.updateSmartSearchItems(previous);
  },
);
