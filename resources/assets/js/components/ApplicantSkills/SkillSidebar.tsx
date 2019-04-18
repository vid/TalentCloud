import React from 'react';
import ReactDOM from 'react-dom';

interface SkillSidebarProps {
  sidebarLabel: string;
  navItems: object;
  navItemTitle: string;
}

const SkillSidebar: React.SFC<SkillSidebarProps> = ({
  sidebarLabel,
  navItems,
  navItemTitle,
}): JSX.Element => {
  return (
    <div className="application-post__subnav-wrapper box lg-1of4">
      <nav className="application-post__subnav-sticky-wrapper">
        <h4 className="application-post_subnav-label">{sidebarLabel}</h4>
        {Object.keys(navItems).map(item => {
          const { skill } = navItems[item];
          return (
            <a
              className="application-post__subnav-item"
              href={`#skill${skill.name}`}
              title={navItemTitle}
              key={item}
            >
              {skill.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default SkillSidebar;
