import { MedusaError } from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";
import type { CustomerSmartSearch } from "./retrieve-customer-smart-search";

type ValidateSearchItemStepInput = {
  title: string;
  content: string;
  smart_search: CustomerSmartSearch;
  current_search_item_id?: string;
};

export const validateSearchItemStep = createStep(
  "validate-search-item-step",
  async ({
    title,
    content,
    smart_search,
    current_search_item_id,
  }: ValidateSearchItemStepInput) => {
    const isDuplicate = smart_search.items?.some(
      (item) =>
        item.id !== current_search_item_id &&
        item.title === title &&
        item.content === content,
    );

    if (isDuplicate) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Item is already in smart search",
      );
    }
  },
);
