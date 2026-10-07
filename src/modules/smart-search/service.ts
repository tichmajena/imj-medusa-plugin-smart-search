import { MedusaService } from "@medusajs/framework/utils";
import { SmartSearches } from "./models/saved-searches";
import { SmartSearchItem } from "./models/saved-search";

export default class SmartSearchModuleService extends MedusaService({
  SmartSearches,
  SmartSearchItem,
}) {}
