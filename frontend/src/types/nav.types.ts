export type NavItemConfig = {
  label: string;
  to: string;
  roles?: Array<'guest' | 'user' | 'admin'>;
};
