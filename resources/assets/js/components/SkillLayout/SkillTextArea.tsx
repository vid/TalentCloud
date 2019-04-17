import * as React from 'react';

interface SkillTextAreaProps {
  description: string;
  idPrefix: number;
  knowledgeLabel: string;
}

const SkillTextArea: React.FunctionComponent<SkillTextAreaProps> = ({
  description,
  idPrefix,
  knowledgeLabel,
}): React.ReactElement => {
  return (
    <div className="box full">
      <div className={`form__input-wrapper--float ${description && 'active'}`}>
        <label className="form__label" htmlFor={`${idPrefix}skillDescription`}>
          {knowledgeLabel}
        </label>

        <textarea
          className="form__textarea"
          id={`${idPrefix}skillDescription`}
          name="description"
          required
        >
          {description}
        </textarea>
      </div>
    </div>
  );
};

export default SkillTextArea;
