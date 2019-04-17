import * as React from 'react';

interface SkillDescriptionProps {
  description: string;
  skillDeclaration: boolean;
  skillDeclarationId: string;
  criterionSkillId: string;
  statusName: string;
  statusLabel: string;
}

const SkillDescription: React.FunctionComponent<SkillDescriptionProps> = ({
  description,
  skillDeclaration,
  skillDeclarationId,
  criterionSkillId,
  statusLabel,
  statusName,
}): React.ReactElement => {
  return (
    <div className="box full">
      <p className="skill__description">{description}</p>

      {skillDeclaration ? (
        <React.Fragment>
          <p className="skill__status">
            {statusLabel} {statusName}
          </p>
          <input
            type="hidden"
            name="skill_declaration_id"
            value={skillDeclarationId}
          />
        </React.Fragment>
      ) : (
        <input type="hidden" name="skill_id" value={criterionSkillId} />
      )}
    </div>
  );
};

export default SkillDescription;
