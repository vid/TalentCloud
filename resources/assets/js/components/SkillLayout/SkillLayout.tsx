import React from 'react';
import ReactDOM from 'react-dom';
import SkillLayoutHeader from './SkillLayoutHeader';

interface SkillLayoutProps {
  applicationStep: string;
  title: string;
  context: string;
  skillsSectionTitle: string;
}

const SkillLayout: React.FunctionComponent<SkillLayoutProps> = ({
  applicationStep,
  title,
  context,
  skillsSectionTitle,
}): React.ReactElement => {
  return (
    <section className="application-post__skills-layout">
      <SkillLayoutHeader title={title} context={context} />
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

    ReactDOM.render(
      <SkillLayout
        applicationStep={applicationStep}
        title={title}
        context={context}
        skillsSectionTitle={skillsSectionTitle}
      />,
      container,
    );
  }
}

export default SkillLayout;
