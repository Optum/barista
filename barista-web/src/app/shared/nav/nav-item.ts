export interface NavItem {
  children?: NavItem[];
  disabled?: boolean;
  displayName: string;
  iconName?: string;
  route?: string;
}
