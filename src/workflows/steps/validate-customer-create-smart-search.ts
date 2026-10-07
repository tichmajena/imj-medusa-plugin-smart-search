import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";
import { createStep } from "@medusajs/framework/workflows-sdk";

type ValidateCustomerCreateSmartSearchStepInput = {
  customer_id: string;
  search_type: string;
};

export const validateCustomerCreateSmartSearchStep = createStep(
  "validate-customer-create-smart-search-step",
  async (
    { customer_id, search_type }: ValidateCustomerCreateSmartSearchStepInput,
    { container },
  ) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    const { data: existingSmartSearches } = await query.graph({
      entity: "smart_searches",
      fields: ["id"],
      filters: {
        customer_id,
        search_type,
      },
    });

    if (existingSmartSearches.length) {
      throw new MedusaError(
        MedusaError.Types.DUPLICATE_ERROR,
        `Customer already has a smart search for search_type: ${search_type}`,
      );
    }

    const { data: customers } = await query.graph({
      entity: "customer",
      fields: ["id"],
      filters: {
        id: customer_id,
      },
    });

    if (!customers.length) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Specified customer was not found",
      );
    }
  },
);
