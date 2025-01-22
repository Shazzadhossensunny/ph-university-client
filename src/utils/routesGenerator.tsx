import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};
type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export const mainRoutesGenerator = (items: TUserPath[]) => {
  const routes: TRoute[] = [];
  // Directly process adminPath
  items.forEach(({ path, element, children }) => {
    if (path && element) {
      // Add to routes
      routes.push({ path, element });
    }

    if (children) {
      children.forEach(({ path: childPath, element: childElement }) => {
        if (childPath && childElement) {
          routes.push({ path: childPath, element: childElement });
        }
      });
    }
  });

  return routes;
};
