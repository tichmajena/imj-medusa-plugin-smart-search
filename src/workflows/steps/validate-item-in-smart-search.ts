import { MedusaError } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import type { CustomerSmartSearch } from "./retrieve-customer-smart-search";

type ValidateItemInSmartSearchStepInput = {
  smart_search: CustomerSmartSearch;
  search_item_id: string;
};

export const validateItemInSmartSearchStep = createStep(
  "validate-item-in-smart-search-step",
  async ({
    smart_search,
    search_item_id,
  }: ValidateItemInSmartSearchStepInput) => {
    const item = smart_search.items.find(
      (searchItem) => searchItem.id === search_item_id,
    );

    if (!item) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Item does not exist in the smart search",
      );
    }

    return new StepResponse(item);
  },
);
