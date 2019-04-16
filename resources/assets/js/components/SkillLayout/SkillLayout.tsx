import React from "react";
import ReactDOM from "react-dom";

interface SkillLayoutProps {
  name: string;
}

interface SkillLayoutState {
  title: string;
}

class SkillLayout extends React.Component<SkillLayoutProps, SkillLayoutState> {
  public constructor(props: SkillLayoutProps) {
    super(props);
  }

  public render(): React.ReactElement {
    return (
      <div>
        <h1>Skill Layout</h1>
      </div>
    );
  }
}

if( document.getElementById("skill-layout")) {
  const container = document.getElementById(
    "skill-layout"
  ) as HTMLElement;
  if ( container.hasAttribute("data-name")) {
    const name = container.getAttribute("data-name") as string;
    ReactDOM.render(
      <SkillLayout name={name}/>,
      container,
    );
  }
}

export default SkillLayout;
