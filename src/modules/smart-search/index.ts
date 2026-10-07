import SmartSearchModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const SMART_SEARCH_MODULE = "smart-search";

export default Module(SMART_SEARCH_MODULE, {
  service: SmartSearchModuleService,
});
