import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createSmartSearchWorkflow } from "../../../../../workflows/create-smart-search";
import { getSalesChannelId } from "../../../../utils/sales-channel";
import type {
  GetStoreSmartSearchesParamsType,
  PostStoreCreateSmartSearchType,
} from "../../../../validators";

export async function POST(
  req: AuthenticatedMedusaRequest<PostStoreCreateSmartSearchType>,
  res: MedusaResponse,
) {
  const { result } = await createSmartSearchWorkflow(req.scope).run({
    input: {
      customer_id: req.auth_context.actor_id,
      sales_channel_id: getSalesChannelId(req),
      search_type: req.validatedBody.search_type,
    },
  });

  res.status(201).json({ smart_search: result.smartSearch });
}

export async function GET(
  req: AuthenticatedMedusaRequest<GetStoreSmartSearchesParamsType>,
  res: MedusaResponse,
) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data, metadata } = await query.graph({
    entity: "smart_searches",
    fields: req.queryConfig.fields,
    filters: {
      ...req.filterableFields,
      customer_id: req.auth_context.actor_id,
    },
    pagination: req.queryConfig.pagination,
  });

  res.json({
    smart_searches: data,
    count: metadata?.count ?? data.length,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? data.length,
  });
}
