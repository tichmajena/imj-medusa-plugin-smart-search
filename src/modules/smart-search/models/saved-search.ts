import { model } from "@medusajs/framework/utils";
import { SmartSearches } from "./saved-searches";

export const SmartSearchItem = model.define("search_item", {
  id: model.id().primaryKey(),
  title: model.text(),
  content: model.text(),
  search: model.belongsTo(() => SmartSearches, {
    mappedBy: "items",
  }),
});
