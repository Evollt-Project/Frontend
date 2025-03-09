import type { RouteParamsRawGeneric } from "vue-router";

export interface ISidebarItem {
  url: string;
  params?: RouteParamsRawGeneric
  title: string;
}

export interface ICollapsibleSidebarItem {
  title: string;
  icon: string;
  isActive: boolean;
  items?: ISidebarItem[];
  url?: string;
  params?: RouteParamsRawGeneric
}
