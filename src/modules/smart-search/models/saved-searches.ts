import { model } from "@medusajs/framework/utils";
import { SmartSearchItem } from "./saved-search";

export const SmartSearches = model
  .define("smart_searches", {
    id: model.id().primaryKey(),
    customer_id: model.text(),
    sales_channel_id: model.text(),
    search_type: model.text(),
    items: model.hasMany(() => SmartSearchItem, {
      mappedBy: "search",
    }),
  })
  .cascades({
    delete: ["items"],
  })
  .indexes([
    {
      on: ["customer_id", "search_type"],
      unique: true,
    },
  ]);
