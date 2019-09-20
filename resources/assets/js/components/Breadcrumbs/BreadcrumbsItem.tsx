import * as React from "react";

interface BreadcrumbItemProps {
  href: string;
  title: string;
  currentPage?: boolean;
}

const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps> = ({
  href,
  title,
  currentPage,
}): React.ReactElement => {
  return (
    <li>
      <a href={href} title={title} aria-current={currentPage && "page"}>
        {title}
      </a>
      <i className="fa fa-caret-right" />
    </li>
  );
};

export default BreadcrumbItem;
