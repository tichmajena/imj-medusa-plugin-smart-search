import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";
import { deleteSmartSearchWorkflow } from "../../../../../../workflows/delete-smart-search";

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse,
) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "smart_searches",
    fields: req.queryConfig.fields,
    filters: {
      id: req.params.id,
      customer_id: req.auth_context.actor_id,
    },
  });

  if (!data.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Smart search with id: ${req.params.id} was not found`,
    );
  }

  res.json({ smart_search: data[0] });
}

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse,
) {
  const { result } = await deleteSmartSearchWorkflow(req.scope).run({
    input: {
      smart_search_id: req.params.id,
      customer_id: req.auth_context.actor_id,
    },
  });

  res.json({ id: result.id, object: "smart_search", deleted: true });
}
