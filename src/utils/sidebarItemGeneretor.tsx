import { ReactNode } from "react";
import { NavLink } from "react-router";

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export const sidebadGeneretor = (items: TUserPath[], role: string) => {
  const sideBarItems: TSidebarItems[] = [];
  items.forEach(({ name, path, children }) => {
    if (path) {
      sideBarItems.push({
        key: path,
        label: <NavLink to={`/${role}/${path}`}>{name}</NavLink>,
      });
    }

    if (children) {
      const childMenuItems: TSidebarItems[] = [];
      children.forEach(({ name: childName, path: childPath }) => {
        if (childPath) {
          childMenuItems.push({
            key: childPath,
            label: <NavLink to={`/${role}/${childPath}`}>{childName}</NavLink>,
          });
        }
      });

      sideBarItems.push({
        key: name,
        label: name,
        children: childMenuItems,
      });
    }
  });

  return sideBarItems;
};
