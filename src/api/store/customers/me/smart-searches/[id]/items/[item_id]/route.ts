import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { deleteSmartSearchItemWorkflow } from "../../../../../../../../workflows/delete-smart-search-item";
import { updateSmartSearchItemWorkflow } from "../../../../../../../../workflows/update-smart-search-item";
import type { PostStoreUpdateSmartSearchItemType } from "../../../../../../../validators";

export async function POST(
  req: AuthenticatedMedusaRequest<PostStoreUpdateSmartSearchItemType>,
  res: MedusaResponse,
) {
  const { result } = await updateSmartSearchItemWorkflow(req.scope).run({
    input: {
      smart_search_id: req.params.id,
      search_item_id: req.params.item_id,
      customer_id: req.auth_context.actor_id,
      title: req.validatedBody.title,
      content: req.validatedBody.content,
    },
  });

  res.json({ smart_search: result.smartSearch });
}

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse,
) {
  const { result } = await deleteSmartSearchItemWorkflow(req.scope).run({
    input: {
      smart_search_id: req.params.id,
      search_item_id: req.params.item_id,
      customer_id: req.auth_context.actor_id,
    },
  });

  res.json({ smart_search: result.smartSearch });
}
