import React from 'react';
import ReactDOM from 'react-dom';
import SkillLayoutHeader from './SkillLayoutHeader';
import SkillWrapper from './SkillWrapper';

interface SkillLayoutProps {
  applicationStep: string;
  title: string;
  context: string;
  skillsSectionTitle: string;
  sidebar: object;
}

const SkillLayout: React.FunctionComponent<SkillLayoutProps> = ({
  applicationStep,
  title,
  context,
  skillsSectionTitle,
  sidebar,
}): React.ReactElement => {
  return (
    <section className="application-post__skills-layout">
      <SkillLayoutHeader title={title} context={context} />
      <SkillWrapper sidebar={sidebar} skillsSectionTitle={skillsSectionTitle} />
    </section>
  );
};

if (document.getElementById('skill-layout')) {
  const container = document.getElementById('skill-layout') as HTMLElement;
  if (container.hasAttribute('data-application-step')) {
    const applicationStep = container.getAttribute(
      'data-application-step',
    ) as string;
    const title = container.getAttribute('data-title') as string;
    const context = container.getAttribute('data-context') as string;
    const skillsSectionTitle = container.getAttribute(
      'data-skills-section-title',
    ) as string;
    const sidebarLabel = container.getAttribute('data-sidebar-label') as string;
    const navItems = JSON.parse(container.getAttribute(
      'data-nav-items',
    ) as string);
    const navItemTitle = container.getAttribute(
      'data-nav-item-title',
    ) as string;

    ReactDOM.render(
      <SkillLayout
        applicationStep={applicationStep}
        title={title}
        context={context}
        skillsSectionTitle={skillsSectionTitle}
        sidebar={{ sidebarLabel, navItems, navItemTitle }}
      />,
      container,
    );
  }
}

export default SkillLayout;
