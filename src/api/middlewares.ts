import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import {
  GetStoreSmartSearchesParams,
  PostStoreCreateSmartSearch,
  PostStoreCreateSmartSearchItem,
  PostStoreUpdateSmartSearchItem,
} from "./validators";
import {
  listSmartSearchesQueryConfig,
  retrieveSmartSearchQueryConfig,
} from "./query-config";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/customers/me/smart-searches",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreCreateSmartSearch)],
    },
    {
      matcher: "/store/customers/me/smart-searches",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          GetStoreSmartSearchesParams,
          listSmartSearchesQueryConfig,
        ),
      ],
    },
    {
      matcher: "/store/customers/me/smart-searches/:id",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          createFindParams(),
          retrieveSmartSearchQueryConfig,
        ),
      ],
    },
    {
      matcher: "/store/customers/me/smart-searches/:id/items",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreCreateSmartSearchItem)],
    },
    {
      matcher: "/store/customers/me/smart-searches/:id/items/:item_id",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreUpdateSmartSearchItem)],
    },
  ],
});
