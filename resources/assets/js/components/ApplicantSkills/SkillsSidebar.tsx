import React from 'react';
import ReactDOM from 'react-dom';

interface SkillsSidebarProps {
  title: string;
  navItems: object;
  navItemTitle: string;
}

const SkillsSidebar: React.SFC<SkillsSidebarProps> = ({
  title,
  navItems,
  navItemTitle,
}): JSX.Element => {
  return (
    // <div className="application-post__subnav-wrapper box lg-1of4">
    <nav className="application-post__subnav-sticky-wrapper">
      <h4 className="application-post_subnav-label">{title}</h4>
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
    // </div>
  );
};

export default SkillsSidebar;

if (document.getElementById('skills-sidebar')) {
  const container = document.getElementById('skills-sidebar') as HTMLElement;
  if (
    container.hasAttribute('data-title') &&
    container.hasAttribute('data-nav-items') &&
    container.hasAttribute('data-nav-item-title')
  ) {
    const title = container.getAttribute('data-title') as string;
    const navItems = JSON.parse(container.getAttribute(
      'data-nav-items',
    ) as string);
    const navItemTitle = container.getAttribute(
      'data-nav-item-title',
    ) as string;
    ReactDOM.render(
      <SkillsSidebar
        title={title}
        navItems={navItems}
        navItemTitle={navItemTitle}
      />,
      container,
    );
  }
}
