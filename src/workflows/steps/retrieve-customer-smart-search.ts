import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type CustomerSmartSearch = {
  id: string;
  customer_id: string;
  sales_channel_id: string;
  search_type: string;
  items: {
    id: string;
    title: string;
    content: string;
    search_id: string;
  }[];
};

type RetrieveCustomerSmartSearchStepInput = {
  smart_search_id: string;
  customer_id: string;
};

export const retrieveCustomerSmartSearchStep = createStep(
  "retrieve-customer-smart-search-step",
  async (input: RetrieveCustomerSmartSearchStepInput, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    const { data } = await query.graph({
      entity: "smart_searches",
      fields: [
        "id",
        "customer_id",
        "sales_channel_id",
        "search_type",
        "items.id",
        "items.title",
        "items.content",
        "items.search_id",
      ],
      filters: {
        id: input.smart_search_id,
        customer_id: input.customer_id,
      },
    });

    const smartSearch = data[0] as CustomerSmartSearch | undefined;

    if (!smartSearch) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Smart search with id: ${input.smart_search_id} was not found`,
      );
    }

    return new StepResponse(smartSearch);
  },
);
