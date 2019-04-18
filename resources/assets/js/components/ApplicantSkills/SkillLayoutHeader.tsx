import React from 'react';

interface SkillLayoutHeaderProps {
  title: string;
  context: string;
}

const SkillLayoutHeader: React.FunctionComponent<SkillLayoutHeaderProps> = ({
  title,
  context,
}): React.ReactElement => {
  return (
    <div className="container--copy">
      <React.Fragment>
        <h3>{title}</h3>
        <p>{context}</p>
      </React.Fragment>
    </div>
  );
};

export default SkillLayoutHeader;
