import * as React from "react";
import BreadcrumbItem from "./BreadcrumbsItem";

export interface BreadcrumbItemType {
  href: string;
  title: string;
  currentPage?: boolean;
}

export interface BreadcrumbsProps {
  fontColor?: string;
  crumbs?: BreadcrumbItemType[];
  children?: React.ReactNode;
  margin?: string;
}

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  fontColor,
  crumbs,
  children,
  margin,
}): React.ReactElement => {
  return (
    <nav
      aria-label="breadcrumb"
      data-c-breadcrumbs
      data-c-colour={fontColor}
      data-c-margin={margin}
    >
      <ol>
        {crumbs &&
          crumbs.map(
            ({ title, href, currentPage }): React.ReactElement => {
              return (
                <BreadcrumbItem
                  key={title}
                  href={href}
                  title={title}
                  currentPage={currentPage}
                />
              );
            },
          )}
        {children}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
