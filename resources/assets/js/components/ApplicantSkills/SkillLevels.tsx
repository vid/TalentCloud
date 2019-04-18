import * as React from 'react';

interface SkillLevelsProps {
  levelLabel: string;
  levelLinkLabel: string;
  levelLinkTitle: string;
  skillLevels: object;
}

interface SkillLevelsState {
  counter: number;
}

class SkillLevels extends React.Component<SkillLevelsProps, SkillLevelsState> {
  public constructor(props: SkillLevelsProps) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  public render(): React.ReactElement {
    const {
      levelLabel,
      levelLinkLabel,
      levelLinkTitle,
      skillLevels,
    } = this.props;
    const { counter } = this.state;
    return (
      <div className="box full">
        <div
          aria-orientation="horizontal"
          className="form__radio-group"
          role="radiogroup"
        >
          <label className="form__label" htmlFor="{{ id_prefix }}skillLevel">
            {levelLabel}
            <a href="/faq#levels" title={levelLinkTitle} target="_blank">
              {levelLinkLabel}
            </a>
          </label>
          <div className="flex-grid">
            {Object.keys(skillLevels).map(level => {
              this.setState({ counter: counter + 1 });
              console.log(level);
              // <SkillLevelItem
              //   numOfSkills={}
              //   idPrefix={}
              //   counter={counter}
              //   name={}
              //   id={}
              //   skillLevelId={}
              // />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SkillLevels;
