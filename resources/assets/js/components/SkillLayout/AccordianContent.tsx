import React from 'react';

interface AccordianContentProps {
  skillDeclaration: object;
}

interface AccordianContentState {
  isOpen: boolean;
}

class AccordianContent extends React.Component<
  AccordianContentProps,
  AccordianContentState
> {
  public constructor(props: AccordianContentProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  public render(): React.ReactElement {
    const { skillDeclaration } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        aria-hidden={skillDeclaration ? 'true' : 'false'}
        className="accordion-content"
      >
        <form
          // action={ skill_declaration ?  }
          method="POST"
        >
          <input
            name="_method"
            type="hidden"
            value={skillDeclaration ? 'PUT' : 'POST'}
          />
          <div className="form__wrapper">
            <div className="flex-grid">
              {/* Holds errors from ajax form submission  */}
              <div className="form-error box" />
              {/* <SkillDescription
                statusLabel={}
                statusName={}
                skillDeclaration={}
                description={}
              /> */}
              {isOpen && <h1>hello2</h1>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AccordianContent;
