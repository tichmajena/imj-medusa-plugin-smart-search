import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { createSmartSearchItemWorkflow } from "../../../../../../../workflows/create-smart-search-item";
import type { PostStoreCreateSmartSearchItemType } from "../../../../../../validators";

export async function POST(
  req: AuthenticatedMedusaRequest<PostStoreCreateSmartSearchItemType>,
  res: MedusaResponse,
) {
  const { result } = await createSmartSearchItemWorkflow(req.scope).run({
    input: {
      smart_search_id: req.params.id,
      customer_id: req.auth_context.actor_id,
      title: req.validatedBody.title,
      content: req.validatedBody.content,
    },
  });

  res.status(201).json({ smart_search: result.smartSearch });
}
