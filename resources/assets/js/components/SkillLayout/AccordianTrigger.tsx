import React from 'react';
import ReactDOM from 'react-dom';
/*

Props:

- skillsDeclaration
- locale
- skillName
- skillTitle
- criterion

*/

interface AccordianTriggerProps {
  title: string;
  subtitle: string;
  srHelper: string;
}

interface AccordianTriggerState {
  isOpen: boolean;
}

class AccordianTrigger extends React.Component<
  AccordianTriggerProps,
  AccordianTriggerState
> {
  public constructor(props: AccordianTriggerProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  protected handleOpenAccordian(isOpen): void {
    this.setState({ isOpen });
  }

  public render(): React.ReactElement {
    const { title, subtitle, srHelper } = this.props;
    const { isOpen } = this.state;
    return (
      <button
        aria-expanded={isOpen}
        className="accordian-trigger"
        tabIndex={0}
        type="button"
      >
        <div className="accordian-status">
          <i className="fas fa-check" />
          <i className="fas fa-exclamation-circle" />
        </div>

        <span className="accordian-title">
          {title}
          {subtitle && <span>{subtitle}</span>}
        </span>

        <span className="invisible">{srHelper}</span>

        <i className="fas fa-chevron-up" />
      </button>
    );
  }
}

if (document.getElementById('skill-accordian-trigger')) {
  const container = document.getElementById(
    'skill-accordian-trigger',
  ) as HTMLElement;
  if (
    container.hasAttribute('data-title') &&
    container.hasAttribute('data-subtitle') &&
    container.hasAttribute('data-sr-helper')
  ) {
    const title = container.getAttribute('data-title') as string;
    const subtitle = container.getAttribute('data-subtitle') as string;
    const srHelper = container.getAttribute('data-sr-helper') as string;
    ReactDOM.render(
      <AccordianTrigger
        title={title}
        subtitle={subtitle}
        srHelper={srHelper}
      />,
      container,
    );
  }
}

export default AccordianTrigger;
