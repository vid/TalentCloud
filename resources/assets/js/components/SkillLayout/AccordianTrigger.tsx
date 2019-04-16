import React from 'react';
import ReactDOM from 'react-dom';
import { string } from 'prop-types';

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
}

interface AccordianTriggerState {

}

class AccordianTrigger extends React.Component<AccordianTriggerProps, AccordianTriggerState> {
  public constructor(props: AccordianTriggerProps) {
    super(props);
  }

  public render(): React.ReactElement {
    const {title} = this.props;
    return (
      <button
        aria-expanded="true"
        aria-expanded="false"
        class="accordian-trigger"
        tabIndex="0"
        type="button">
        <div
          class="accordian-status">
          <i class="fas fa-check"></i>
          <i class="fas fa-exclamation-circle"></i>
        </div>

        <span class="accordian-title">
          {/*  */}
          <span></span>
        </span>
      </button>
    )
  };
};

if(document.getElementById("skill-accordian-trigger")) {
  const container = document.getElementById("skill-accordian-trigger") as HTMLElement;
  if( container.hasAttribute("data-title")) {
    const title = container.getAttribute("data-title") as string;
    ReactDOM.render(<AccordianTrigger title={title}/>)
  }
}

export default AccordianTrigger;
