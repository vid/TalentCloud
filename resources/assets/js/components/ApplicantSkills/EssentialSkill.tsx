import React from 'react';
import ReactDOM from 'react-dom';

/*

Props:

skillDeclaration


*/

interface EssentialSkillProps {
  locale: string;
  skillDeclaration: boolean;
  applicationStep: string;
  skillType: string;
  criterion: object;
  skillTemplate: object;
  relativeTemplate: object;
}

interface EssentialSkillState {
  isActive: boolean;
}

class EssentialSkill extends React.Component<
  EssentialSkillProps,
  EssentialSkillState
> {
  public constructor(props: EssentialSkillProps) {
    super(props);

    this.state = {
      isActive: false,
    };
  }

  public render(): React.ReactElement {
    const { skillDeclaration, applicationStep, criterion } = this.props;
    const { isActive } = this.state;

    return (
      <div
        className={`profile-element accordion skill ajax-form modal-target-object ${
          applicationStep === '3' && criterion ? 'template' : ''
        } ${skillDeclaration && 'complete'}`}
      >
        {isActive && <h1>hello</h1>}
      </div>
    );
  }
}

if (document.getElementById('skill-accordian-trigger')) {
  const container = document.getElementById(
    'skill-accordian-trigger',
  ) as HTMLElement;
  if (container.hasAttribute('data-locale')) {
    const locale = container.getAttribute('data-locale') as string;
    const skillDeclaration = JSON.parse(container.getAttribute(
      'data-skill-declaration',
    ) as string);
    const applicationStep = container.getAttribute(
      'data-application-step',
    ) as string;
    const skillType = container.getAttribute('data-skill-type') as string;
    const criterion = JSON.parse(container.getAttribute(
      'data-criterion',
    ) as string);
    const skillTemplate = JSON.parse(container.getAttribute(
      'data-skill-template',
    ) as string);
    const relativeTemplate = JSON.parse(container.getAttribute(
      'data-relative-template',
    ) as string);
    ReactDOM.render(
      <EssentialSkill
        locale={locale}
        skillDeclaration={skillDeclaration}
        applicationStep={applicationStep}
        skillType={skillType}
        criterion={criterion}
        skillTemplate={skillTemplate}
        relativeTemplate={relativeTemplate}
      />,
      container,
    );
  }
}
