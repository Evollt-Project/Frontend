export interface ISidebarItem {
  url: string;
  title: string;
}

export interface ICollapsibleSidebarItem {
  title: string;
  icon: string;
  isActive: boolean;
  items?: ISidebarItem[];
  url?: string;
}
