import * as React from 'react';
import SkillSidebar from './SkillSidebar';
import SkillContent from './SkillContent';

interface SkillWrapperProps {
  sidebar: any;
  skillsSectionTitle: string;
}

const SkillWrapper: React.FunctionComponent<SkillWrapperProps> = ({
  sidebar,
  skillsSectionTitle,
}): React.ReactElement => {
  return (
    <div className="container--layout">
      <div className="flex-grid">
        <SkillSidebar {...sidebar} />
        <SkillContent skillsSectionTitle={skillsSectionTitle} />
      </div>
    </div>
  );
};

export default SkillWrapper;
