import { z } from "@medusajs/framework/zod";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

const searchType = z.string().trim().min(1).max(255);
const itemTitle = z.string().trim().min(1).max(255);
const itemContent = z.string().trim().min(1).max(10000);

export const PostStoreCreateSmartSearch = z.object({
  search_type: searchType,
});

export type PostStoreCreateSmartSearchType = z.infer<
  typeof PostStoreCreateSmartSearch
>;

export const PostStoreCreateSmartSearchItem = z.object({
  title: itemTitle,
  content: itemContent,
});

export type PostStoreCreateSmartSearchItemType = z.infer<
  typeof PostStoreCreateSmartSearchItem
>;

export const PostStoreUpdateSmartSearchItem = z
  .object({
    title: itemTitle.optional(),
    content: itemContent.optional(),
  })
  .refine((body) => body.title !== undefined || body.content !== undefined, {
    message: "At least one of title or content is required",
  });

export type PostStoreUpdateSmartSearchItemType = z.infer<
  typeof PostStoreUpdateSmartSearchItem
>;

export const GetStoreSmartSearchesParams = createFindParams({
  limit: 20,
  offset: 0,
}).extend({
  search_type: searchType.optional(),
});

export type GetStoreSmartSearchesParamsType = z.infer<
  typeof GetStoreSmartSearchesParams
>;
