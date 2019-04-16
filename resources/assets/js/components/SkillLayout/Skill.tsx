import React from 'react';
import ReactDOM from 'react-dom';
import AccordianTrigger from './AccordianTrigger';

/*

Props:

- skillsDeclaration
- locale
- skillName
- skillTitle
- criterion

*/

interface SkillProps {
  title: string;
}

interface SkillState {

}

class Skill extends React.Component<SkillProps, SkillState> {
  public constructor(props: SkillProps) {
    super(props);
  }

  public render(): React.ReactElement {
    const {title} = this.props;
    return (
      <div>
        {title}
      </div>
    )
  };
};

if(document.getElementById("skill-accordian-trigger")) {
  const container = document.getElementById("skill-accordian-trigger") as HTMLElement;
  if( container.hasAttribute("data-title")) {
    const title = container.getAttribute("data-title") as string;
    ReactDOM.render(<Skill title={title}/>)
  }
}
