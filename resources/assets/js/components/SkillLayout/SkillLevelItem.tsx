import * as React from 'react';

interface SkillLevelItemProps {
  numOfSkills: number;
  idPrefix: string;
  counter: number;
  name: string;
  id: number;
  skillLevelId: number;
}

const SkillLevelItem: React.FunctionComponent<SkillLevelItemProps> = ({
  numOfSkills,
  idPrefix,
  counter,
  name,
  id,
  skillLevelId,
}): React.ReactElement => {
  return (
    <label
      className={`box form__radio-group-label small-1of${numOfSkills}`}
      htmlFor={`${idPrefix}skillLevel_${counter}`}
    >
      <span className="hidden">{name}</span>
      <input
        className="form__radio-group-input"
        id={`${idPrefix}skillLevel_${counter}`}
        name="skill_level_id"
        type="radio"
        value={id}
        required
        checked={skillLevelId === id && true}
      />
      <span className="form__radio-group-span">{name}</span>
    </label>
  );
};

export default SkillLevelItem;
